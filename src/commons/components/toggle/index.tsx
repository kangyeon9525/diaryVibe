"use client";

import {
  forwardRef,
  type InputHTMLAttributes,
} from "react";
import styles from "./styles.module.css";

export type ToggleVariant = "primary" | "secondary" | "tertiary";
export type ToggleSize = "small" | "medium" | "large";
export type ToggleTheme = "light" | "dark";

export type ToggleProps = {
  variant?: ToggleVariant;
  size?: ToggleSize;
  theme?: ToggleTheme;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type" | "size" | "onChange"> & {
    className?: string;
  };

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  {
    variant = "primary",
    size = "medium",
    theme = "light",
    className,
    disabled,
    checked,
    onChange,
    ...rest
  },
  ref,
) {
  const wrapperClass = [styles.wrapper, className].filter(Boolean).join(" ");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <label
      className={wrapperClass}
      data-variant={variant}
      data-size={size}
      data-theme={theme}
      data-disabled={disabled}
    >
      <input
        ref={ref}
        type="checkbox"
        className={styles.input}
        disabled={disabled}
        checked={checked}
        onChange={handleChange}
        {...rest}
      />
      <span
        className={styles.track}
        data-variant={variant}
        data-size={size}
        data-theme={theme}
        data-checked={checked}
      >
        <span className={styles.thumb} />
      </span>
    </label>
  );
});

export { Toggle };
export default Toggle;
