"use client";

import { forwardRef } from "react";
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
  description: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
};

const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    variant = "info",
    actions = "single",
    theme = "light",
    title,
    description,
    primaryLabel = "확인",
    secondaryLabel = "취소",
    onPrimaryClick,
    onSecondaryClick,
  },
  ref,
) {
  const isDark = theme === "dark";
  const secondaryButtonTheme = isDark ? "dark" : "light";

  let primaryVariant: "primary" | "secondary" = "primary";
  let primaryButtonTheme: "light" | "dark" = "light";
  if (actions === "single" && isDark) {
    primaryVariant = "secondary";
    primaryButtonTheme = "light";
  } else if (isDark) {
    primaryVariant = "primary";
    primaryButtonTheme = "dark";
  }

  return (
    <div
      ref={ref}
      className={styles.root}
      data-variant={variant}
      data-actions={actions}
      data-theme={theme}
    >
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.actions}>
        {actions === "dual" && (
          <Button
            variant="secondary"
            size="large"
            theme={secondaryButtonTheme}
            onClick={onSecondaryClick}
            className={styles.dualButton}
          >
            {secondaryLabel}
          </Button>
        )}
        <Button
          variant={primaryVariant}
          size="large"
          theme={primaryButtonTheme}
          onClick={onPrimaryClick}
          className={actions === "single" ? styles.singleButton : styles.dualButton}
        >
          {primaryLabel}
        </Button>
      </div>
    </div>
  );
});

export { Modal };
