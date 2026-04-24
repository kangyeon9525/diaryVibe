"use client";

import type { CSSProperties } from "react";

import { Selectbox } from "@/commons/components/selectbox";
import { PictureFilterLayout } from "@/commons/constants/enum";
import { usePicturesBinding } from "./hooks/index.binding.hook";
import { usePicturesFilter } from "./hooks/index.filter.hook";
import styles from "./styles.module.css";

const SPLASH_KEYS = ["s0", "s1", "s2", "s3", "s4", "s5"];

export function Pictures() {
  const {
    imageEntries,
    sentinelRefCallback,
    isInitialPending,
    isInitialError,
    isFetchingNextPage,
  } = usePicturesBinding();

  const { layout, dimensions, layoutOptions, handleLayoutChange } =
    usePicturesFilter();

  const photoListSizeStyle = {
    "--pictures-photo-w": `${dimensions.width}px`,
    "--pictures-photo-h": `${dimensions.height}px`,
  } as CSSProperties;

  const photoListLayoutClass =
    layout === PictureFilterLayout.Default
      ? styles.photoListLayoutDefault
      : layout === PictureFilterLayout.Landscape
        ? styles.photoListLayoutLandscape
        : styles.photoListLayoutPortrait;

  return (
    <div className={styles.container} data-testid="pictures-page-loaded">
      <div className={styles.gap32} aria-hidden />
      <div className={styles.filter} aria-label="필터 영역">
        <div data-testid="picture-filter-select">
          <Selectbox
            variant="primary"
            theme="light"
            size="medium"
            className={styles.filterSelect}
            value={layout}
            onChange={handleLayoutChange}
          >
            {layoutOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Selectbox>
        </div>
      </div>
      <div className={styles.gap42} aria-hidden />
      <div className={styles.main} aria-label="메인 영역">
        {isInitialError ? (
          <p className={styles.errorText} data-testid="pictures-fetch-error">
            강아지 사진을 불러오지 못했습니다.
          </p>
        ) : null}

        {isInitialPending ? (
          <div className={styles.photoListVars} style={photoListSizeStyle}>
            <div
              className={`${styles.photoList} ${photoListLayoutClass}`}
              aria-busy="true"
              aria-label="로딩"
            >
              {SPLASH_KEYS.map((splashKey) => (
                <div
                  key={splashKey}
                  className={styles.photoItem}
                  data-testid={`picture-splash-${splashKey}`}
                >
                  <div className={styles.splashInner}>
                    <div className={styles.splashBar} aria-hidden />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.photoListVars} style={photoListSizeStyle}>
            <div className={`${styles.photoList} ${photoListLayoutClass}`}>
              {imageEntries.map((item, index) => (
                <div
                  key={item.key}
                  className={styles.photoItem}
                  data-testid={`picture-dog-${index}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- dog.ceo 외부 URL, next.config 수정 없이 표시 */}
                  <img
                    src={item.src}
                    alt={`강아지 사진 ${index + 1}`}
                    width={dimensions.width}
                    height={dimensions.height}
                    className={styles.photo}
                    loading={index < 6 ? "eager" : "lazy"}
                  />
                </div>
              ))}
              <div
                ref={sentinelRefCallback}
                className={styles.infiniteSentinel}
                data-testid="pictures-infinite-sentinel"
                aria-hidden
              />
              {isFetchingNextPage ? (
                <div
                  className={styles.nextPageHint}
                  data-testid="pictures-fetching-next"
                  aria-hidden
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
