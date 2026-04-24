"use client";

import { createElement, useCallback, useMemo } from "react";

import { Modal } from "@/commons/components/modal";
import { useAuth } from "@/commons/providers/auth/auth.provider";
import { useAuthGuardAction } from "@/commons/providers/auth/auth.guard.hook";
import { useModal } from "@/commons/providers/modal/modal.provider";

const STORAGE_KEY = "diaries";

const isTestEnv = process.env.NEXT_PUBLIC_TEST_ENV === "test";

type WindowAuthFlags = Window & {
  __TEST_BYPASS__?: boolean;
  __TEST_AUTH_STRICT__?: boolean;
};

type StoredDiary = {
  id: number;
  title: string;
  content: string;
  emotion: string;
  createdAt: string;
};

function shouldShowDeleteButton(isLoggedIn: boolean): boolean {
  if (typeof window === "undefined") return false;
  const w = window as WindowAuthFlags;
  if (w.__TEST_BYPASS__ === true) return true;
  if (isTestEnv && w.__TEST_AUTH_STRICT__ !== true) return true;
  return isLoggedIn;
}

function removeDiaryById(numericId: number): void {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const list = JSON.parse(raw) as StoredDiary[];
    if (!Array.isArray(list)) return;
    const next = list.filter((d) => d.id !== numericId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // invalid storage — no-op
  }
}

export function useDiariesDelete() {
  const { isLoggedIn } = useAuth();
  const { open, close } = useModal();
  const { requestMemberOnlyAction } = useAuthGuardAction();

  const isDeleteButtonVisible = useMemo(
    () => shouldShowDeleteButton(isLoggedIn),
    [isLoggedIn],
  );

  const onDiaryDeleteButtonClick = useCallback(
    (diaryId: string) => {
      const actionKey = `diary-card-delete-${diaryId}`;
      const allowed = requestMemberOnlyAction(actionKey);
      if (!allowed) return;

      const numericId = Number(diaryId);
      if (!Number.isFinite(numericId)) {
        return;
      }

      open(
        createElement(
          "div",
          { "data-testid": "diaries-delete-confirm-modal" },
          createElement(Modal, {
            variant: "danger",
            actions: "dual",
            title: "일기를 삭제할까요?",
            description: "일기는 삭제 후 복구할 수 없어요. 삭제한 일기는 복원되지 않아요.",
            primaryLabel: "삭제",
            secondaryLabel: "취소",
            onSecondaryClick: close,
            onPrimaryClick: () => {
              removeDiaryById(numericId);
              close();
              window.location.reload();
            },
          }),
        ),
      );
    },
    [close, open, requestMemberOnlyAction],
  );

  return {
    isDeleteButtonVisible,
    onDiaryDeleteButtonClick,
  };
}
