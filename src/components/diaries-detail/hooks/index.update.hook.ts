"use client";

import { useCallback, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Emotion } from "@/commons/constants/enum";

const EMOTION_ENUM_VALUES = [
  Emotion.Happy,
  Emotion.Sad,
  Emotion.Angry,
  Emotion.Surprise,
  Emotion.Etc,
] as const;

const updateSchema = z.object({
  emotion: z.enum(EMOTION_ENUM_VALUES),
  title: z.string().min(1),
  content: z.string().min(1),
});

type UpdateFormValues = z.infer<typeof updateSchema>;

type DiaryItem = {
  id: number;
  title: string;
  content: string;
  emotion: UpdateFormValues["emotion"];
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

function findDiary(diaryId: number | null): DiaryItem | null {
  if (diaryId == null) return null;
  return loadDiaries().find((d) => d.id === diaryId) ?? null;
}

export function useDiaryUpdateForm() {
  const params = useParams();
  const idParam = params?.id;
  const diaryId =
    typeof idParam === "string" ? parseInt(idParam, 10) : null;

  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isValid },
  } = useForm<UpdateFormValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      emotion: Emotion.Happy,
      title: "",
      content: "",
    },
    mode: "onChange",
  });

  const emotion = watch("emotion");

  const enterEditMode = useCallback(() => {
    const diary = findDiary(diaryId);
    if (!diary) return;
    setIsEditing(true);
    reset({
      emotion: diary.emotion,
      title: diary.title,
      content: diary.content,
    });
  }, [diaryId, reset]);

  const setEmotion = useCallback(
    (value: UpdateFormValues["emotion"]) => {
      setValue("emotion", value, { shouldValidate: true });
    },
    [setValue],
  );

  const onSubmit = handleSubmit((values) => {
    if (diaryId == null) return;

    const diaries = loadDiaries();
    const idx = diaries.findIndex((d) => d.id === diaryId);
    if (idx === -1) return;

    const next: DiaryItem = {
      ...diaries[idx],
      title: values.title.trim(),
      content: values.content.trim(),
      emotion: values.emotion,
    };

    const copy = [...diaries];
    copy[idx] = next;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(copy));
    setIsEditing(false);
    router.refresh();
  });

  return {
    isEditing,
    enterEditMode,
    register,
    onSubmit,
    emotion,
    setEmotion,
    isSubmitDisabled: !isValid,
  };
}
