"use client";

import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  Children,
  isValidElement,
  Fragment,
  type ReactNode,
  type MutableRefObject,
} from "react";
import styles from "./styles.module.css";

export type SelectboxVariant = "primary" | "secondary" | "tertiary";
export type SelectboxSize = "small" | "medium" | "large";
export type SelectboxTheme = "light" | "dark";

type OptionItem = { value: string; label: string };

function parseOptions(children: ReactNode): OptionItem[] {
  const result: OptionItem[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    if (child.type === "option") {
      const p = child.props as { value?: unknown; children?: unknown };
      result.push({ value: String(p.value ?? ""), label: String(p.children ?? "") });
    } else if (child.type === Fragment) {
      result.push(...parseOptions((child.props as { children?: ReactNode }).children));
    }
  });
  return result;
}

export type SelectboxProps = {
  variant?: SelectboxVariant;
  size?: SelectboxSize;
  theme?: SelectboxTheme;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
};

const Selectbox = forwardRef<HTMLDivElement, SelectboxProps>(
  function Selectbox(
    {
      variant = "primary",
      size = "medium",
      theme = "light",
      value,
      onChange,
      className,
      disabled,
      children,
    },
    ref,
  ) {
    const options = parseOptions(children);
    const [internalValue, setInternalValue] = useState<string>(
      () => options[0]?.value ?? "",
    );
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const selectedValue = value !== undefined ? value : internalValue;
    const selectedOption = options.find((o) => o.value === selectedValue) ?? options[0];

    useEffect(() => {
      if (!open) return;
      const handleOutside = (e: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleOutside);
      return () => document.removeEventListener("mousedown", handleOutside);
    }, [open]);

    const handleToggle = () => {
      if (!disabled) setOpen((prev) => !prev);
    };

    const handleSelect = (optValue: string) => {
      if (value === undefined) setInternalValue(optValue);
      onChange?.(optValue);
      setOpen(false);
    };

    const setRefs = (node: HTMLDivElement | null) => {
      (wrapperRef as MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as MutableRefObject<HTMLDivElement | null>).current = node;
    };

    return (
      <div
        ref={setRefs}
        className={[styles.wrapper, className].filter(Boolean).join(" ")}
        data-variant={variant}
        data-size={size}
        data-theme={theme}
        data-disabled={disabled}
        data-open={open}
      >
        <button
          type="button"
          className={styles.trigger}
          disabled={disabled}
          onClick={handleToggle}
          data-variant={variant}
          data-size={size}
          data-theme={theme}
        >
          <span className={styles.triggerText}>{selectedOption?.label ?? ""}</span>
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
        </button>
        {open && (
          <ul
            className={styles.dropdown}
            role="listbox"
            data-theme={theme}
            data-variant={variant}
          >
            {options.map((opt) => {
              const isSelected = opt.value === selectedValue;
              return (
                <li
                  key={opt.value}
                  className={styles.option}
                  role="option"
                  aria-selected={isSelected}
                  data-selected={isSelected}
                  data-theme={theme}
                  onClick={() => handleSelect(opt.value)}
                >
                  <span
                    className={styles.optionText}
                    data-selected={isSelected}
                    data-theme={theme}
                  >
                    {opt.label}
                  </span>
                  <span
                    className={styles.checkIcon}
                    data-selected={isSelected}
                    data-theme={theme}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 8L6 11.5L13.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  },
);

export { Selectbox };
export default Selectbox;
