"use client";

import styles from "./styles.module.css";

export function Pictures() {
  return (
    <div className={styles.container} data-testid="pictures-page-loaded">
      <div className={styles.gap32} aria-hidden />
      <div className={styles.filter} aria-label="필터 영역">
        {/* 필터 컴포넌트 추가 예정 */}
      </div>
      <div className={styles.gap42} aria-hidden />
      <div className={styles.main} aria-label="메인 영역">
        {/* 메인 컨텐츠 추가 예정 */}
      </div>
    </div>
  );
}
