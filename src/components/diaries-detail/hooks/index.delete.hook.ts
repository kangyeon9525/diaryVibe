"use client";

import { createElement, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";

import { Modal } from "@/commons/components/modal";
import type { Emotion } from "@/commons/constants/enum";
import { staticPaths } from "@/commons/constants/url";
import { useModal } from "@/commons/providers/modal/modal.provider";

type DiaryItem = {
  id: number;
  title: string;
  content: string;
  emotion: Emotion;
  createdAt: string;
};

const STORAGE_KEY = "diaries";

function loadDiaries(): DiaryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as DiaryItem[];
  } catch {
    return [];
  }
}

export function useDiaryDelete() {
  const params = useParams();
  const idParam = params?.id;
  const diaryId =
    typeof idParam === "string" ? parseInt(idParam, 10) : null;

  const router = useRouter();
  const { open, close } = useModal();

  const openDeleteModal = useCallback(() => {
    if (diaryId == null || Number.isNaN(diaryId)) return;

    open(
      createElement(
        "div",
        { "data-testid": "diary-detail-delete-modal" },
        createElement(Modal, {
          variant: "danger",
          actions: "dual",
          title: "일기 삭제",
          description: "일기를 삭제 하시겠어요?",
          primaryLabel: "삭제",
          secondaryLabel: "취소",
          onSecondaryClick: close,
          onPrimaryClick: () => {
            const list = loadDiaries();
            const next = list.filter((d) => d.id !== diaryId);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            close();
            router.push(staticPaths.diaries);
          },
        }),
      ),
    );
  }, [close, diaryId, open, router]);

  return { openDeleteModal };
}
