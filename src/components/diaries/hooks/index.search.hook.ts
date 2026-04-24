import { useEffect, useMemo, useState } from "react";

import { Emotion, isEmotion } from "@/commons/constants/enum";

type Diary = {
  id: number;
  title: string;
  content: string;
  emotion: Emotion;
  createdAt: string;
};

type DiaryCard = {
  id: string;
  emotion: Emotion;
  date: string;
  title: string;
};

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}. ${month}. ${day}`;
}

function parseDiaryCardsFromStorage(): DiaryCard[] {
  const storageData = localStorage.getItem("diaries");

  if (!storageData) {
    return [];
  }

  try {
    const parsedData: Diary[] = JSON.parse(storageData);

    return parsedData
      .filter((diary) => isEmotion(diary.emotion))
      .map((diary) => ({
        id: String(diary.id),
        emotion: diary.emotion,
        date: formatDate(diary.createdAt),
        title: diary.title,
      }));
  } catch {
    return [];
  }
}

export function useDiariesSearch() {
  const [allDiaries, setAllDiaries] = useState<DiaryCard[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");

  useEffect(() => {
    setAllDiaries(parseDiaryCardsFromStorage());
  }, []);

  useEffect(() => {
    if (searchInput.trim() === "") {
      setAppliedQuery("");
    }
  }, [searchInput]);

  const diaries = useMemo(() => {
    const q = appliedQuery.trim();
    if (!q) {
      return allDiaries;
    }
    return allDiaries.filter((d) => d.title.includes(q));
  }, [allDiaries, appliedQuery]);

  const submitSearch = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }
    setAppliedQuery(trimmed);
    setSearchInput(trimmed);
  };

  const isSearchActionDisabled = searchInput.trim() === "";

  return {
    diaries,
    searchInput,
    setSearchInput,
    submitSearch,
    isSearchActionDisabled,
  };
}
