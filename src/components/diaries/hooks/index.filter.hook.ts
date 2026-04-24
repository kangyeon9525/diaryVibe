import { useCallback, useMemo, useState } from "react";

import { Emotion, getEmotionLabel, isEmotion } from "@/commons/constants/enum";

/** 프롬프트 메뉴(전체 + 행복/슬픔/놀람/화남) — `Etc` 제외 */
export const DIARY_LIST_FILTER_EMOTIONS = [
  Emotion.Happy,
  Emotion.Sad,
  Emotion.Surprise,
  Emotion.Angry,
] as const;

export type DiaryListItem = {
  id: string;
  emotion: Emotion;
  date: string;
  title: string;
};

function isDiaryListFilterEmotionValue(value: string): boolean {
  if (value === "all") return true;
  if (!isEmotion(value)) return false;
  return (DIARY_LIST_FILTER_EMOTIONS as readonly Emotion[]).includes(
    value as (typeof DIARY_LIST_FILTER_EMOTIONS)[number],
  );
}

export function useDiariesFilter(sourceDiaries: DiaryListItem[]) {
  const [filterValue, setFilterValue] = useState<string>("all");

  const diaries = useMemo(() => {
    if (filterValue === "all") {
      return sourceDiaries;
    }
    if (isEmotion(filterValue)) {
      return sourceDiaries.filter((d) => d.emotion === filterValue);
    }
    return sourceDiaries;
  }, [sourceDiaries, filterValue]);

  const emotionFilterOptions = useMemo(
    () => [
      { value: "all", label: "전체" },
      ...DIARY_LIST_FILTER_EMOTIONS.map((emotion) => ({
        value: emotion,
        label: getEmotionLabel(emotion),
      })),
    ],
    [],
  );

  const handleEmotionFilterChange = useCallback((value: string) => {
    if (isDiaryListFilterEmotionValue(value)) {
      setFilterValue(value);
    }
  }, []);

  return {
    diaries,
    emotionFilterValue: filterValue,
    handleEmotionFilterChange,
    emotionFilterOptions,
  };
}
