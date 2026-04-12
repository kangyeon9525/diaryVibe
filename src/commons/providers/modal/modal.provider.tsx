"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

type ModalContextValue = {
  open: (content: ReactNode) => void;
  close: () => void;
  isOpen: boolean;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal은 ModalProvider 내부에서만 사용할 수 있습니다.");
  }
  return ctx;
}

function ModalPortal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(children, document.body);
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const open = useCallback((content: ReactNode) => {
    setModalContent(content);
  }, []);

  const close = useCallback(() => {
    setModalContent(null);
  }, []);

  const value = useMemo<ModalContextValue>(
    () => ({
      open,
      close,
      isOpen: modalContent != null,
    }),
    [open, close, modalContent],
  );

  useEffect(() => {
    if (modalContent == null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [modalContent, close]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ModalPortal>
        {modalContent != null ? (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
            onClick={close}
            role="presentation"
          >
            <div
              className="relative rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-900"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              {modalContent}
            </div>
          </div>
        ) : null}
      </ModalPortal>
    </ModalContext.Provider>
  );
}
