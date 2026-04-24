"use client";

import { useCallback } from "react";

import { useAuthGuardAction } from "@/commons/providers/auth/auth.guard.hook";
import { useModal } from "@/commons/providers/modal/modal.provider";
import { DiariesNew } from "@/components/diaries-new";

const WRITE_DIARY_ACTION_KEY = "diaries-func-link-write-modal";

export function useDiariesLinkModal() {
  const { open } = useModal();
  const { requestMemberOnlyAction } = useAuthGuardAction();

  const openWriteDiaryModal = useCallback(() => {
    const allowed = requestMemberOnlyAction(WRITE_DIARY_ACTION_KEY);
    if (!allowed) return;
    open(<DiariesNew />);
  }, [open, requestMemberOnlyAction]);

  return { openWriteDiaryModal };
}
