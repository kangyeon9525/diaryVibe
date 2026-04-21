"use client";

import { Selectbox } from "@/commons/components/selectbox";
import { usePicturesBinding } from "./hooks/index.binding.hook";
import styles from "./styles.module.css";

const FILTER_OPTIONS = [
  { value: "기본", label: "기본" },
  { value: "최신순", label: "최신순" },
  { value: "오래된순", label: "오래된순" },
];

const SPLASH_KEYS = ["s0", "s1", "s2", "s3", "s4", "s5"];

export function Pictures() {
  const {
    imageEntries,
    sentinelRefCallback,
    isInitialPending,
    isInitialError,
    isFetchingNextPage,
  } = usePicturesBinding();

  return (
    <div className={styles.container} data-testid="pictures-page-loaded">
      <div className={styles.gap32} aria-hidden />
      <div className={styles.filter} aria-label="필터 영역">
        <Selectbox
          variant="primary"
          theme="light"
          size="medium"
          className={styles.filterSelect}
        >
          {FILTER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Selectbox>
      </div>
      <div className={styles.gap42} aria-hidden />
      <div className={styles.main} aria-label="메인 영역">
        {isInitialError ? (
          <p className={styles.errorText} data-testid="pictures-fetch-error">
            강아지 사진을 불러오지 못했습니다.
          </p>
        ) : null}

        {isInitialPending ? (
          <div className={styles.photoList} aria-busy="true" aria-label="로딩">
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
        ) : (
          <div className={styles.photoList}>
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
                  width={640}
                  height={640}
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
        )}
      </div>
    </div>
  );
}
