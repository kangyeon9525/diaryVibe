"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useModal } from "@/commons/providers/modal/modal.provider";
import { Modal } from "@/commons/components/modal";
import { Emotion } from "@/commons/constants/enum";
import { getDiaryDetailPath } from "@/commons/constants/url";

const EMOTION_ENUM_VALUES = [
  Emotion.Happy,
  Emotion.Sad,
  Emotion.Angry,
  Emotion.Surprise,
  Emotion.Etc,
] as const;

const diarySchema = z.object({
  emotion: z.enum(EMOTION_ENUM_VALUES),
  title: z.string().min(1),
  content: z.string().min(1),
});

type DiaryFormValues = z.infer<typeof diarySchema>;

type DiaryItem = {
  id: number;
  title: string;
  content: string;
  emotion: DiaryFormValues["emotion"];
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

function saveDiary(values: DiaryFormValues): DiaryItem {
  const diaries = loadDiaries();
  const maxId = diaries.reduce((max, d) => Math.max(max, d.id), 0);
  const newDiary: DiaryItem = {
    id: maxId + 1,
    title: values.title,
    content: values.content,
    emotion: values.emotion,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...diaries, newDiary]));
  return newDiary;
}

export function useDiariesNewForm() {
  const { open, close } = useModal();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<DiaryFormValues>({
    resolver: zodResolver(diarySchema),
    defaultValues: {
      emotion: Emotion.Happy,
      title: "",
      content: "",
    },
    mode: "onChange",
  });

  const emotion = watch("emotion");

  const setEmotion = useCallback(
    (value: DiaryFormValues["emotion"]) => {
      setValue("emotion", value, { shouldValidate: true });
    },
    [setValue],
  );

  const onSubmit = handleSubmit((values) => {
    const saved = saveDiary(values);

    open(
      <div data-testid="diaries-new-func-form-success-modal">
        <Modal
          variant="info"
          actions="single"
          title="등록이 완료되었습니다!"
          description="일기가 성공적으로 등록되었습니다."
          primaryLabel="확인"
          onPrimaryClick={() => {
            close();
            close();
            router.push(getDiaryDetailPath(saved.id));
          }}
        />
      </div>,
    );
  });

  return {
    register,
    onSubmit,
    emotion,
    setEmotion,
    isValid,
  };
}
