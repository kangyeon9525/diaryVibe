"use client";

import { Button } from "@/commons/components/button";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

export type ModalVariant = "info" | "danger";
export type ModalActions = "single" | "dual";
export type ModalTheme = "light" | "dark";

export type ModalProps = {
  variant?: ModalVariant;
  actions?: ModalActions;
  theme?: ModalTheme;
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

function iconLabel(variant: ModalVariant): string {
  return variant === "danger" ? "!" : "i";
}

export function Modal({
  variant = "info",
  actions = "single",
  theme = "light",
  title,
  description,
  confirmLabel = "확인",
  cancelLabel = "취소",
  onConfirm,
  onCancel,
}: ModalProps) {
  const actionRowClass = [
    styles.actions,
    actions === "single" ? styles.actionsSingle : styles.actionsDual,
  ].join(" ");

  return (
    <div
      className={styles.root}
      data-variant={variant}
      data-actions={actions}
      data-theme={theme}
    >
      <div className={styles.body}>
        <div className={styles.iconWrap} aria-hidden>
          <span className={styles.iconGlyph}>{iconLabel(variant)}</span>
        </div>
        <div className={styles.textBlock}>
          <h2 className={styles.title}>{title}</h2>
          {description != null ? (
            <p className={styles.description}>{description}</p>
          ) : null}
        </div>
      </div>
      <div className={actionRowClass}>
        {actions === "dual" ? (
          <>
            <Button
              type="button"
              variant="secondary"
              size="medium"
              theme="light"
              className={styles.dualButton}
              onClick={onCancel}
            >
              {cancelLabel}
            </Button>
            <Button
              type="button"
              variant="primary"
              size="medium"
              theme="light"
              className={styles.dualButton}
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          </>
        ) : (
          <Button
            type="button"
            variant="primary"
            size="medium"
            theme="light"
            className={styles.singleButton}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
