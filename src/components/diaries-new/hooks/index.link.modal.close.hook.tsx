"use client";

import { useCallback } from "react";

import { useModal } from "@/commons/providers/modal/modal.provider";
import { Modal } from "@/commons/components/modal";

export function useDiariesNewLinkModalClose() {
  const { open, close } = useModal();

  const handleClose = useCallback(() => {
    open(
      <Modal
        variant="info"
        actions="dual"
        title="등록을 취소하시겠어요?"
        description="작성 중인 내용이 모두 사라집니다."
        primaryLabel="등록취소"
        secondaryLabel="계속작성"
        onSecondaryClick={close}
        onPrimaryClick={() => {
          close();
          close();
        }}
      />,
    );
  }, [open, close]);

  return { handleClose };
}
