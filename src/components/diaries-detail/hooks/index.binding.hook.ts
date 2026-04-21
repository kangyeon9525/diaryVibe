"use client";

import { useParams } from "next/navigation";
import { Emotion } from "@/commons/constants/enum";

type DiaryItem = {
  id: number;
  title: string;
  content: string;
  emotion: Emotion;
  createdAt: string;
};

const STORAGE_KEY = "diaries";

function loadDiaries(): DiaryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as DiaryItem[];
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

export function useDiaryBinding() {
  const params = useParams();
  const idParam = params?.id;
  const diaryId = typeof idParam === "string" ? parseInt(idParam, 10) : null;

  const diaries = loadDiaries();
  const diary = diaryId ? diaries.find((d) => d.id === diaryId) : null;

  return {
    diary: diary
      ? {
          ...diary,
          formattedDate: formatDate(diary.createdAt),
        }
      : null,
  };
}
