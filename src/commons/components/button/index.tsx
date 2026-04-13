"use client";

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import styles from "./styles.module.css";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonTheme = "light" | "dark";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  theme?: ButtonTheme;
  children?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    className?: string;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "medium",
    theme = "light",
    type = "button",
    className,
    disabled,
    children,
    ...rest
  },
  ref,
) {
  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  return (
    <button
      ref={ref}
      type={type}
      className={rootClass}
      disabled={disabled}
      data-variant={variant}
      data-size={size}
      data-theme={theme}
      {...rest}
    >
      <span className={styles.inner}>{children}</span>
    </button>
  );
});

export { Button };
