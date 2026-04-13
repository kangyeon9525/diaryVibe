"use client";

import {
  forwardRef,
  type InputHTMLAttributes,
} from "react";
import styles from "./styles.module.css";

export type InputVariant = "primary" | "secondary" | "tertiary";
export type InputSize = "small" | "medium" | "large";
export type InputTheme = "light" | "dark";

export type InputProps = {
  variant?: InputVariant;
  size?: InputSize;
  theme?: InputTheme;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
    className?: string;
  };

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    variant = "primary",
    size = "medium",
    theme = "light",
    type = "text",
    className,
    disabled,
    ...rest
  },
  ref,
) {
  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  return (
    <input
      ref={ref}
      type={type}
      className={rootClass}
      disabled={disabled}
      data-variant={variant}
      data-size={size}
      data-theme={theme}
      {...rest}
    />
  );
});

export { Input };
