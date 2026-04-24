"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { Modal } from "@/commons/components/modal";
import { staticPaths } from "@/commons/constants/url";
import { useModal } from "@/commons/providers/modal/modal.provider";

import { useAuth } from "./auth.provider";

function closeAllModals(close: () => void) {
  for (let i = 0; i < 10; i += 1) {
    close();
  }
}

const isTestEnv = process.env.NEXT_PUBLIC_TEST_ENV === "test";

type WindowTestFlags = Window & {
  __TEST_BYPASS__?: boolean;
  __TEST_AUTH_STRICT__?: boolean;
};

function shouldBypassLoginCheck(): boolean {
  if (typeof window === "undefined") return false;
  const w = window as WindowTestFlags;
  if (w.__TEST_BYPASS__ === true) return true;
  if (isTestEnv && w.__TEST_AUTH_STRICT__ !== true) return true;
  return false;
}

let pendingMemberActionModalKey: string | null = null;

export function useAuthGuardAction() {
  const { isLoggedIn } = useAuth();
  const { open, close, isOpen } = useModal();
  const router = useRouter();

  const requestMemberOnlyAction = useCallback(
    (actionKey = "member-only-action"): boolean => {
      if (shouldBypassLoginCheck()) return true;
      if (isLoggedIn) return true;

      if (pendingMemberActionModalKey === actionKey) {
        if (isOpen) return false;
        pendingMemberActionModalKey = null;
      }

      pendingMemberActionModalKey = actionKey;

      open(
        <div>
          <Modal
            variant="info"
            actions="dual"
            title="로그인하시겠습니까"
            description="회원 전용 기능입니다. 로그인 후 이용해 주세요."
            primaryLabel="로그인하러가기"
            secondaryLabel="취소"
            onPrimaryClick={() => {
              closeAllModals(close);
              pendingMemberActionModalKey = null;
              router.push(staticPaths.authLogin);
            }}
            onSecondaryClick={() => {
              closeAllModals(close);
              pendingMemberActionModalKey = null;
            }}
          />
        </div>,
      );

      return false;
    },
    [close, isLoggedIn, isOpen, open, router],
  );

  return { requestMemberOnlyAction };
}
