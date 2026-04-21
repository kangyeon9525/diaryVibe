import { useState, useEffect } from 'react';
import { Emotion, isEmotion } from '@/commons/constants/enum';

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
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}. ${month}. ${day}`;
}

export function useDiariesBinding() {
  const [diaries, setDiaries] = useState<DiaryCard[]>([]);

  useEffect(() => {
    const storageData = localStorage.getItem('diaries');
    
    if (!storageData) {
      setDiaries([]);
      return;
    }

    try {
      const parsedData: Diary[] = JSON.parse(storageData);
      
      const diaryCards: DiaryCard[] = parsedData
        .filter((diary) => isEmotion(diary.emotion))
        .map((diary) => ({
          id: String(diary.id),
          emotion: diary.emotion,
          date: formatDate(diary.createdAt),
          title: diary.title,
        }));

      setDiaries(diaryCards);
    } catch {
      setDiaries([]);
    }
  }, []);

  return { diaries };
}
