"use client";

import {
  forwardRef,
  useCallback,
  useRef,
  type InputHTMLAttributes,
} from "react";
import styles from "./styles.module.css";

export type SearchbarVariant = "primary" | "secondary" | "tertiary";
export type SearchbarSize = "small" | "medium" | "large";
export type SearchbarTheme = "light" | "dark";

export type SearchbarProps = {
  variant?: SearchbarVariant;
  size?: SearchbarSize;
  theme?: SearchbarTheme;
  onSearch?: (value: string) => void;
  /** true이면 엔터·돋보기 버튼으로 검색 실행하지 않음 */
  searchActionDisabled?: boolean;
  submitButtonTestId?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "size"> & {
  className?: string;
};

const Searchbar = forwardRef<HTMLInputElement, SearchbarProps>(function Searchbar(
  {
    variant = "primary",
    size = "medium",
    theme = "light",
    type = "text",
    className,
    disabled,
    onSearch,
    onKeyDown,
    searchActionDisabled = false,
    submitButtonTestId,
    ...rest
  },
  ref,
) {
  const innerRef = useRef<HTMLInputElement | null>(null);

  const setInputRef = useCallback(
    (el: HTMLInputElement | null) => {
      innerRef.current = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    },
    [ref],
  );

  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch && !searchActionDisabled) {
      onSearch(e.currentTarget.value);
    }
    onKeyDown?.(e);
  };

  const handleIconClick = () => {
    if (!onSearch || searchActionDisabled) return;
    onSearch(innerRef.current?.value ?? "");
  };

  return (
    <div
      className={rootClass}
      data-variant={variant}
      data-size={size}
      data-theme={theme}
    >
      <button
        type="button"
        className={styles.iconButton}
        aria-label="검색"
        disabled={disabled || searchActionDisabled}
        onClick={handleIconClick}
        data-testid={submitButtonTestId}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <input
        ref={setInputRef}
        type={type}
        className={styles.input}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        {...rest}
      />
    </div>
  );
});

export { Searchbar };
