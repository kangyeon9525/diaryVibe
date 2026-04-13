"use client";

import {
  forwardRef,
  type SelectHTMLAttributes,
  type ReactNode,
} from "react";
import styles from "./styles.module.css";

export type SelectboxVariant = "primary" | "secondary" | "tertiary";
export type SelectboxSize = "small" | "medium" | "large";
export type SelectboxTheme = "light" | "dark";

export type SelectboxProps = {
  variant?: SelectboxVariant;
  size?: SelectboxSize;
  theme?: SelectboxTheme;
  children?: ReactNode;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "className"> & {
    className?: string;
  };

const Selectbox = forwardRef<HTMLSelectElement, SelectboxProps>(
  function Selectbox(
    {
      variant = "primary",
      size = "medium",
      theme = "light",
      className,
      disabled,
      children,
      ...rest
    },
    ref,
  ) {
    const rootClass = [styles.root, className].filter(Boolean).join(" ");

    return (
      <div
        className={styles.wrapper}
        data-variant={variant}
        data-size={size}
        data-theme={theme}
        data-disabled={disabled}
      >
        <select
          ref={ref}
          className={rootClass}
          disabled={disabled}
          data-variant={variant}
          data-size={size}
          data-theme={theme}
          {...rest}
        >
          {children}
        </select>
        <div className={styles.iconWrapper}>
          <svg
            className={styles.icon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    );
  },
);

export { Selectbox };
