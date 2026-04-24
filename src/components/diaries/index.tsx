"use client";

import { useState } from "react";
import Image from "next/image";
import { Selectbox } from "@/commons/components/selectbox";
import { Searchbar } from "@/commons/components/searchbar";
import { Button } from "@/commons/components/button";
import { Pagination } from "@/commons/components/pagination";
import {
  getEmotionLabel,
  getEmotionColor,
  emotionConfig,
} from "@/commons/constants/enum";
import { useDiariesFilter } from "./hooks/index.filter.hook";
import { useDiariesLinkModal } from "./hooks/index.link.modal.hook";
import { useDiariesLinkRouting } from "./hooks/index.link.routing.hook";
import { useDiariesSearch } from "./hooks/index.search.hook";
import styles from "./styles.module.css";

export function Diaries() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const { openWriteDiaryModal } = useDiariesLinkModal();
  const { handleCardClick } = useDiariesLinkRouting();
  const {
    diaries: searchedDiaries,
    searchInput,
    setSearchInput,
    submitSearch,
    isSearchActionDisabled,
  } = useDiariesSearch();
  const {
    diaries,
    emotionFilterValue,
    handleEmotionFilterChange,
    emotionFilterOptions,
  } = useDiariesFilter(searchedDiaries);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("페이지 변경:", page);
  };

  return (
    <div className={styles.container} data-testid="diaries-page-loaded">
      <div className={styles.gap32} aria-hidden />
      <div className={styles.search} aria-label="검색 영역">
        <div className={styles.searchInner}>
          <div className={styles.searchLeft}>
            <div
              className={styles.filterSelectbox}
              data-testid="diaries-emotion-filter"
            >
              <Selectbox
                variant="primary"
                theme="light"
                size="large"
                value={emotionFilterValue}
                onChange={handleEmotionFilterChange}
              >
                {emotionFilterOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Selectbox>
            </div>
            <div className={styles.searchbar}>
              <Searchbar
                variant="primary"
                theme="light"
                size="large"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onSearch={submitSearch}
                searchActionDisabled={isSearchActionDisabled}
                submitButtonTestId="diaries-search-submit"
                placeholder="검색어를 입력해 주세요."
                data-testid="diaries-search-input"
              />
            </div>
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
          {diaries.map((diary) => (
            <div
              key={diary.id}
              className={styles.diaryCard}
              data-testid={`diary-card-${diary.id}`}
              onClick={() => handleCardClick(diary.id)}
            >
              <div
                className={styles.cardImage}
                data-testid={`diary-card-${diary.id}-image`}
              >
                <div className={styles.cardImageTop}>
                  <button
                    type="button"
                    className={styles.deleteButton}
                    data-testid={`diary-card-${diary.id}-delete`}
                    onClick={(e) => e.stopPropagation()}
                    aria-label="일기 삭제"
                  >
                    <Image
                      src="/icons/close_outline_light_s.svg"
                      alt=""
                      width={36}
                      height={36}
                    />
                  </button>
                </div>
                <Image
                  src={`/images/${emotionConfig[diary.emotion].imageFileM.replace(".svg", ".png")}`}
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
                    data-testid={`diary-card-${diary.id}-emotion`}
                  >
                    {getEmotionLabel(diary.emotion)}
                  </span>
                  <span
                    className={styles.date}
                    data-testid={`diary-card-${diary.id}-date`}
                  >
                    {diary.date}
                  </span>
                </div>
                <div
                  className={styles.cardTitle}
                  data-testid={`diary-card-${diary.id}-title`}
                >
                  {diary.title}
                </div>
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
