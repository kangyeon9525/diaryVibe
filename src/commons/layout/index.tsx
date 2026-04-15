"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { useCommonsLayoutArea } from "./hooks/index.area.hook";
import { useCommonsLayoutLinkRouting } from "./hooks/index.link.routing.hook";

import styles from "./styles.module.css";

export type CommonsLayoutProps = {
  children: ReactNode;
};

export function CommonsLayout({ children }: CommonsLayoutProps) {
  const {
    diariesHref,
    picturesHref,
    isDiariesActive,
    isPicturesActive,
    isDiariesListPage,
  } = useCommonsLayoutLinkRouting();

  const {
    showHeader,
    showHeaderLogo,
    showBanner,
    showNavigation,
    showFooter,
  } = useCommonsLayoutArea();

  return (
    <div
      className={styles.container}
      data-testid="commons-layout-root"
    >
      {showHeader ? (
        <>
          <header
            className={styles.header}
            aria-label="헤더 영역"
            data-testid="layout-area-header"
          >
            {showHeaderLogo ? (
              <Link
                href={diariesHref}
                className={styles.headerLogo}
                data-testid="layout-header-logo-link"
              >
                민지의 다이어리
              </Link>
            ) : null}
          </header>
          <div className={styles.gap} aria-hidden />
        </>
      ) : null}
      {showBanner ? (
        <>
          <section
            className={styles.banner}
            aria-label="배너 영역"
            data-testid="layout-area-banner"
          >
            <div className={styles.bannerImage}>
              <Image
                src="/images/banner.png"
                alt="배너 이미지"
                fill
                className={styles.bannerImg}
              />
            </div>
          </section>
          <div className={styles.gap} aria-hidden />
        </>
      ) : null}
      {showNavigation ? (
        <nav
          className={styles.navigation}
          aria-label="내비게이션 영역"
          data-testid="layout-area-navigation"
        >
          <Link
            href={diariesHref}
            className={`${styles.navTab} ${isDiariesActive ? styles.navTabActive : ""}`}
            data-testid="layout-nav-diaries"
            data-active={isDiariesActive ? "true" : "false"}
          >
            일기보관함
          </Link>
          <Link
            href={picturesHref}
            className={`${styles.navTab} ${isPicturesActive ? styles.navTabActive : ""}`}
            data-testid="layout-nav-pictures"
            data-active={isPicturesActive ? "true" : "false"}
          >
            사진보관함
          </Link>
        </nav>
      ) : null}
      <main
        className={styles.main}
        data-testid={isDiariesListPage ? "commons-page-diaries" : undefined}
      >
        {children}
      </main>
      {showFooter ? (
        <footer
          className={styles.footer}
          aria-label="푸터 영역"
          data-testid="layout-area-footer"
        >
          <div className={styles.footerInner}>
            <p className={styles.footerTitle}>민지의 다이어리</p>
            <p className={styles.footerInfo}>대표 : {"{name}"}</p>
            <p className={styles.footerCopyright}>
              Copyright © 2024. {"{name}"} Co., Ltd.
            </p>
          </div>
        </footer>
      ) : null}
    </div>
  );
}
