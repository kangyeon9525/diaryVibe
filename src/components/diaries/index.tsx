"use client";

import { useState } from "react";
import Image from "next/image";
import { Selectbox } from "@/commons/components/selectbox";
import { Searchbar } from "@/commons/components/searchbar";
import { Button } from "@/commons/components/button";
import { Pagination } from "@/commons/components/pagination";
import {
  Emotion,
  getEmotionLabel,
  getEmotionColor,
  emotionConfig,
} from "@/commons/constants/enum";
import { useDiariesLinkModal } from "./hooks/index.link.modal.hook";
import { useDiariesLinkRouting } from "./hooks/index.link.routing.hook";
import styles from "./styles.module.css";

type DiaryCard = {
  id: string;
  emotion: Emotion;
  date: string;
  title: string;
};

const MOCK_DIARIES: DiaryCard[] = [
  {
    id: "1",
    emotion: Emotion.Sad,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다. 한줄까지만 노출 됩니다.",
  },
  {
    id: "2",
    emotion: Emotion.Surprise,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
  },
  {
    id: "3",
    emotion: Emotion.Angry,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
  },
  {
    id: "4",
    emotion: Emotion.Happy,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
  },
  {
    id: "5",
    emotion: Emotion.Etc,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다. 한줄까지만 노출 됩니다.",
  },
  {
    id: "6",
    emotion: Emotion.Surprise,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
  },
  {
    id: "7",
    emotion: Emotion.Angry,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
  },
  {
    id: "8",
    emotion: Emotion.Happy,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
  },
  {
    id: "9",
    emotion: Emotion.Sad,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다. 한줄까지만 노출 됩니다.",
  },
  {
    id: "10",
    emotion: Emotion.Surprise,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
  },
  {
    id: "11",
    emotion: Emotion.Angry,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
  },
  {
    id: "12",
    emotion: Emotion.Happy,
    date: "2024. 03. 12",
    title: "타이틀 영역 입니다.",
  },
];

export function Diaries() {
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const { openWriteDiaryModal } = useDiariesLinkModal();
  const { handleCardClick } = useDiariesLinkRouting();

  const handleSearch = (value: string) => {
    console.log("검색:", value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("페이지 변경:", page);
  };

  return (
    <div className={styles.container} data-testid="diaries-page-loaded">
      <div className={styles.gap32} aria-hidden />
      <div className={styles.search} aria-label="검색 영역">
        <div className={styles.searchInner}>
          <Selectbox
            variant="primary"
            theme="light"
            size="large"
            value={filter}
            onChange={setFilter}
            className={styles.filterSelectbox}
          >
            <option value="all">전체</option>
            <option value="recent">최신순</option>
            <option value="old">오래된순</option>
          </Selectbox>
          <div className={styles.searchbar}>
            <Searchbar
              variant="primary"
              theme="light"
              onSearch={handleSearch}
              placeholder="검색어를 입력해 주세요."
              {...({ size: "large" } as object)}
            />
          </div>
          <Button
            variant="primary"
            theme="light"
            size="large"
            onClick={openWriteDiaryModal}
            className={styles.writeButton}
            data-testid="diaries-func-link-write"
          >
            일기쓰기
          </Button>
        </div>
      </div>
      <div className={styles.gap42} aria-hidden />
      <div className={styles.main} aria-label="메인 영역">
        <div className={styles.diaryGrid}>
          {MOCK_DIARIES.map((diary) => (
            <div
              key={diary.id}
              className={styles.diaryCard}
              data-testid={`diary-card-${diary.id}`}
              onClick={() => handleCardClick(diary.id)}
            >
              <div className={styles.cardImage}>
                <Image
                  src={`/images/${emotionConfig[diary.emotion].imageFileM.replace('.svg', '.png')}`}
                  alt={getEmotionLabel(diary.emotion)}
                  fill
                  className={styles.emotionImage}
                />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <span
                    className={styles.emotionLabel}
                    style={{ color: getEmotionColor(diary.emotion) }}
                  >
                    {getEmotionLabel(diary.emotion)}
                  </span>
                  <span className={styles.date}>{diary.date}</span>
                </div>
                <div className={styles.cardTitle}>{diary.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.gap40} aria-hidden />
      <div className={styles.pagination} aria-label="페이지네이션 영역">
        <Pagination
          variant="primary"
          theme="light"
          size="medium"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          maxVisible={5}
          className={styles.paginationComponent}
        />
      </div>
      <div className={styles.gap40} aria-hidden />
    </div>
  );
}
