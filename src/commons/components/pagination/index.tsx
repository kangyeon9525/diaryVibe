"use client";

import { type ButtonHTMLAttributes } from "react";
import styles from "./styles.module.css";

export type PaginationVariant = "primary" | "secondary" | "tertiary";
export type PaginationSize = "small" | "medium" | "large";
export type PaginationTheme = "light" | "dark";

export type PaginationProps = {
  variant?: PaginationVariant;
  size?: PaginationSize;
  theme?: PaginationTheme;
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  maxVisible?: number;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLDivElement>, "className" | "onClick">;

export function Pagination({
  variant = "primary",
  size = "medium",
  theme = "light",
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
  className,
}: PaginationProps) {
  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange?.(page);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const halfVisible = Math.floor(maxVisible / 2);
      let startPage = Math.max(1, currentPage - halfVisible);
      const endPage = Math.min(totalPages, startPage + maxVisible - 1);

      if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pages = getPageNumbers();
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div
      className={rootClass}
      data-variant={variant}
      data-size={size}
      data-theme={theme}
      role="navigation"
      aria-label="페이지네이션"
    >
      <button
        type="button"
        className={styles.arrow}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isPrevDisabled}
        aria-label="이전 페이지"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.725 11.9996L17.075 19.3496C17.325 19.5996 17.4458 19.8913 17.4375 20.2246C17.4292 20.558 17.3 20.8496 17.05 21.0996C16.8 21.3496 16.5083 21.4746 16.175 21.4746C15.8417 21.4746 15.55 21.3496 15.3 21.0996L7.6 13.4246C7.4 13.2246 7.25 12.9996 7.15 12.7496C7.05 12.4996 7 12.2496 7 11.9996C7 11.7496 7.05 11.4996 7.15 11.2496C7.25 10.9996 7.4 10.7746 7.6 10.5746L15.3 2.87462C15.55 2.62462 15.8458 2.50379 16.1875 2.51212C16.5292 2.52046 16.825 2.64962 17.075 2.89962C17.325 3.14962 17.45 3.44129 17.45 3.77462C17.45 4.10796 17.325 4.39962 17.075 4.64962L9.725 11.9996Z"
            fill="currentColor"
          />
        </svg>
      </button>

      <div className={styles.pages}>
        {pages.map((page, index) => (
          <button
            key={index}
            type="button"
            className={styles.page}
            onClick={() => handlePageChange(page as number)}
            disabled={page === currentPage}
            aria-label={`${page}페이지`}
            aria-current={page === currentPage ? "page" : undefined}
            data-active={page === currentPage}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.arrow}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isNextDisabled}
        aria-label="다음 페이지"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="rotate(180 12 12)">
            <path
              d="M9.725 11.9996L17.075 19.3496C17.325 19.5996 17.4458 19.8913 17.4375 20.2246C17.4292 20.558 17.3 20.8496 17.05 21.0996C16.8 21.3496 16.5083 21.4746 16.175 21.4746C15.8417 21.4746 15.55 21.3496 15.3 21.0996L7.6 13.4246C7.4 13.2246 7.25 12.9996 7.15 12.7496C7.05 12.4996 7 12.2496 7 11.9996C7 11.7496 7.05 11.4996 7.15 11.2496C7.25 10.9996 7.4 10.7746 7.6 10.5746L15.3 2.87462C15.55 2.62462 15.8458 2.50379 16.1875 2.51212C16.5292 2.52046 16.825 2.64962 17.075 2.89962C17.325 3.14962 17.45 3.44129 17.45 3.77462C17.45 4.10796 17.325 4.39962 17.075 4.64962L9.725 11.9996Z"
              fill="currentColor"
            />
          </g>
        </svg>
      </button>
    </div>
  );
}
