"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";

type ModalItem = {
  id: string;
  content: ReactNode;
};

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

type ModalPortalProps = {
  children: ReactNode;
};

function ModalPortal({ children }: ModalPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(children, document.body);
}

type ModalProviderProps = {
  children: ReactNode;
};

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalStack, setModalStack] = useState<ModalItem[]>([]);

  const open = useCallback((content: ReactNode) => {
    const id = `modal-${Date.now()}-${Math.random()}`;
    setModalStack((prev) => [...prev, { id, content }]);
  }, []);

  const close = useCallback(() => {
    setModalStack((prev) => prev.slice(0, -1));
  }, []);

  const value = useMemo<ModalContextValue>(
    () => ({
      open,
      close,
      isOpen: modalStack.length > 0,
    }),
    [open, close, modalStack.length],
  );

  useEffect(() => {
    if (modalStack.length === 0) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [modalStack.length, close]);

  useEffect(() => {
    if (modalStack.length === 0) {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      return;
    }

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight =
      scrollbarWidth > 0 ? `${scrollbarWidth}px` : "";

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [modalStack.length]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ModalPortal>
        {modalStack.map((modal, index) => (
          <div key={modal.id}>
            <div
              className={styles.backdrop}
              style={{ zIndex: 100 + index * 2 }}
              onClick={() => {
                if (index === modalStack.length - 1) {
                  close();
                }
              }}
              role="presentation"
            />
            <div
              className={styles.container}
              style={{ zIndex: 100 + index * 2 + 1 }}
            >
              <div
                className={styles.dialog}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
              >
                {modal.content}
              </div>
            </div>
          </div>
        ))}
      </ModalPortal>
    </ModalContext.Provider>
  );
}
