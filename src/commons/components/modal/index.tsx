"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { Button } from "@/commons/components/button";

import styles from "./styles.module.css";

export type ModalVariant = "info" | "danger";
export type ModalActions = "single" | "dual";
export type ModalTheme = "light" | "dark";

export type ModalProps = {
  variant?: ModalVariant;
  actions?: ModalActions;
  theme?: ModalTheme;
  title: string;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: ReactNode;
  className?: string;
};

const ICON_INFO = "/icons/check_outline_light_xs.svg";
const ICON_DANGER = "/icons/emotion-angry-m.svg";

function Modal({
  variant = "info",
  actions = "single",
  theme = "light",
  title,
  description,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  children,
  className,
}: ModalProps) {
  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  const iconSrc = variant === "danger" ? ICON_DANGER : ICON_INFO;
  const iconSize = variant === "danger" ? 24 : 20;

  return (
    <section
      className={rootClass}
      data-variant={variant}
      data-theme={theme}
      role="document"
      aria-labelledby="modal-title"
    >
      <div className={styles.iconRow}>
        <div className={styles.iconCircle} aria-hidden>
          <Image
            src={iconSrc}
            alt=""
            width={iconSize}
            height={iconSize}
            aria-hidden
          />
        </div>
      </div>

      <h2 id="modal-title" className={styles.title}>
        {title}
      </h2>

      {description != null && description !== "" ? (
        <p className={styles.description}>{description}</p>
      ) : null}

      {children != null ? <div className={styles.body}>{children}</div> : null}

      <div className={styles.actions} data-actions={actions}>
        {actions === "dual" ? (
          <>
            <Button
              type="button"
              variant="secondary"
              size="large"
              theme="light"
              className={styles.buttonDual}
              onClick={onCancel}
            >
              {cancelText}
            </Button>
            <Button
              type="button"
              variant="primary"
              size="large"
              theme="light"
              className={styles.buttonDual}
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          </>
        ) : (
          <Button
            type="button"
            variant="primary"
            size="large"
            theme="light"
            className={styles.buttonSingle}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        )}
      </div>
    </section>
  );
}

export { Modal };
