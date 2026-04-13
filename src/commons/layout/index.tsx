import type { ReactNode } from "react";
import styles from "./styles.module.css";

export type CommonsLayoutProps = {
  children: ReactNode;
};

export function CommonsLayout({ children }: CommonsLayoutProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header} aria-label="헤더 영역" />
      <div className={styles.gap} aria-hidden />
      <section className={styles.banner} aria-label="배너 영역" />
      <div className={styles.gap} aria-hidden />
      <nav className={styles.navigation} aria-label="내비게이션 영역" />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer} aria-label="푸터 영역" />
    </div>
  );
}
