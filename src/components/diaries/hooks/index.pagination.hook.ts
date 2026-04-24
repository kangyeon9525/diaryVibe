import { useCallback, useEffect, useMemo, useState } from "react";

/** 일기 목록: 3행 × 4열 = 12개/페이지 */
export const DIARIES_PAGE_SIZE = 12;

type Identifiable = { id: string };

export function useDiariesPagination<T extends Identifiable>(items: T[]) {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsSignature = useMemo(
    () => `${items.length}|${items.map((item) => item.id).join("|")}`,
    [items],
  );

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(items.length / DIARIES_PAGE_SIZE)),
    [items.length],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsSignature]);

  useEffect(() => {
    setCurrentPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const effectivePage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (effectivePage - 1) * DIARIES_PAGE_SIZE;
    return items.slice(start, start + DIARIES_PAGE_SIZE);
  }, [items, effectivePage]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
    },
    [totalPages],
  );

  return {
    currentPage: effectivePage,
    totalPages,
    paginatedItems,
    handlePageChange,
  };
}
