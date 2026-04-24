"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const retrospectSchema = z.object({
  content: z.string().min(1),
});

type RetrospectFormValues = z.infer<typeof retrospectSchema>;

export type RetrospectStoredItem = {
  id: number;
  content: string;
  diaryId: number;
  createdAt: string;
};

const STORAGE_KEY = "retrospects";

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

export type RetrospectListRow = RetrospectStoredItem & {
  displayDate: string;
};

export function useRetrospectForm(diaryId: number) {
  const activeDiaryId = diaryId > 0 ? diaryId : 0;

  const retrospects: RetrospectListRow[] =
    activeDiaryId === 0
      ? []
      : loadRetrospects()
          .filter((r) => r.diaryId === activeDiaryId)
          .sort((a, b) => a.id - b.id)
          .map((r) => ({
            ...r,
            displayDate: formatDate(r.createdAt),
          }));

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<RetrospectFormValues>({
    resolver: zodResolver(retrospectSchema),
    defaultValues: { content: "" },
    mode: "onChange",
  });

  const content = watch("content");
  const canSubmit =
    activeDiaryId > 0 &&
    isValid &&
    typeof content === "string" &&
    content.trim().length > 0;

  const onSubmit = handleSubmit((values) => {
    if (activeDiaryId <= 0) return;

    const all = loadRetrospects();
    const nextId =
      all.length === 0
        ? 1
        : Math.max(...all.map((r) => r.id), 0) + 1;

    const item: RetrospectStoredItem = {
      id: nextId,
      content: values.content.trim(),
      diaryId: activeDiaryId,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...all, item]));
    window.location.reload();
  });

  return {
    register,
    onSubmit,
    isSubmitDisabled: !canSubmit,
    retrospects,
  };
}
