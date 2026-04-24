"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";

const STORAGE_KEY = "retrospects";

export type RetrospectStoredItem = {
  id: number;
  content: string;
  diaryId: number;
  createdAt: string;
};

export type RetrospectListRow = RetrospectStoredItem & {
  displayDate: string;
};

function loadRetrospects(): RetrospectStoredItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as RetrospectStoredItem[];
  } catch {
    return [];
  }
}

function formatDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}. ${month}. ${day}`;
  } catch {
    return "";
  }
}

export function useRetrospectBinding() {
  const params = useParams();
  const idParam = params?.id;
  const routeDiaryId =
    typeof idParam === "string" ? parseInt(idParam, 10) : NaN;

  const retrospects = useMemo((): RetrospectListRow[] => {
    if (!Number.isFinite(routeDiaryId) || routeDiaryId <= 0) {
      return [];
    }
    return loadRetrospects()
      .filter((r) => r.diaryId === routeDiaryId)
      .sort((a, b) => a.id - b.id)
      .map((r) => ({
        ...r,
        displayDate: formatDate(r.createdAt),
      }));
  }, [routeDiaryId]);

  return {
    retrospects,
    routeDiaryId: Number.isFinite(routeDiaryId) ? routeDiaryId : null,
  };
}
