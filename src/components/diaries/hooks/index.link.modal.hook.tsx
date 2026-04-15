"use client";

import { useCallback } from "react";

import { useModal } from "@/commons/providers/modal/modal.provider";
import { DiariesNew } from "@/components/diaries-new";

export function useDiariesLinkModal() {
  const { open } = useModal();

  const openWriteDiaryModal = useCallback(() => {
    open(<DiariesNew />);
  }, [open]);

  return { openWriteDiaryModal };
}
