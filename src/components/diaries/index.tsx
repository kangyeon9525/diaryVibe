import styles from "./styles.module.css";

export function Diaries() {
  return (
    <div className={styles.container}>
      <div className={styles.gap32} aria-hidden />
      <div className={styles.search} aria-label="검색 영역" />
      <div className={styles.gap42} aria-hidden />
      <div className={styles.main} aria-label="메인 영역" />
      <div className={styles.gap40} aria-hidden />
      <div className={styles.pagination} aria-label="페이지네이션 영역" />
      <div className={styles.gap40} aria-hidden />
    </div>
  );
}
