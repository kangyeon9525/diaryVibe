"use client";

import { useState } from "react";
import { Selectbox } from "@/commons/components/selectbox";
import { Searchbar } from "@/commons/components/searchbar";
import { Button } from "@/commons/components/button";
import styles from "./styles.module.css";

export function Diaries() {
  const [filter, setFilter] = useState("all");

  const handleSearch = (value: string) => {
    console.log("검색:", value);
  };

  const handleWriteDiary = () => {
    console.log("일기쓰기 클릭");
  };

  return (
    <div className={styles.container}>
      <div className={styles.gap32} aria-hidden />
      <div className={styles.search} aria-label="검색 영역">
        <div className={styles.searchInner}>
          <Selectbox
            variant="secondary"
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
            onClick={handleWriteDiary}
            className={styles.writeButton}
          >
            일기쓰기
          </Button>
        </div>
      </div>
      <div className={styles.gap42} aria-hidden />
      <div className={styles.main} aria-label="메인 영역" />
      <div className={styles.gap40} aria-hidden />
      <div className={styles.pagination} aria-label="페이지네이션 영역" />
      <div className={styles.gap40} aria-hidden />
    </div>
  );
}
