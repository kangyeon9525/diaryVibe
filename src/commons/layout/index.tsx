import type { ReactNode } from "react";
import styles from "./styles.module.css";

export type CommonsLayoutProps = {
  children: ReactNode;
};

export function CommonsLayout({ children }: CommonsLayoutProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header} aria-label="헤더 영역">
        <div className={styles.headerLogo}>민지의 다이어리</div>
        <span className={styles.headerDarkMode}>다크모드</span>
      </header>
      <div className={styles.gap} aria-hidden />
      <section className={styles.banner} aria-label="배너 영역">
        <div className={styles.bannerImage} />
      </section>
      <div className={styles.gap} aria-hidden />
      <nav className={styles.navigation} aria-label="내비게이션 영역">
        <button
          type="button"
          className={`${styles.navTab} ${styles.navTabActive}`}
        >
          일기보관함
        </button>
        <button type="button" className={styles.navTab}>
          사진보관함
        </button>
      </nav>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer} aria-label="푸터 영역">
        <div className={styles.footerInner}>
          <p className={styles.footerTitle}>민지의 다이어리</p>
          <p className={styles.footerInfo}>대표 : {"{name}"}</p>
          <p className={styles.footerCopyright}>
            Copyright © 2024. {"{name}"} Co., Ltd.
          </p>
        </div>
      </footer>
    </div>
  );
}
