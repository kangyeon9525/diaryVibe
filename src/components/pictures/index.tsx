"use client";

import Image from "next/image";
import Selectbox from "@/commons/components/selectbox";
import styles from "./styles.module.css";

const FILTER_OPTIONS = [
  { value: "기본", label: "기본" },
  { value: "최신순", label: "최신순" },
  { value: "오래된순", label: "오래된순" },
];

const MOCK_IMAGES = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  src: "/images/dog-1.jpg",
  alt: `강아지 사진 ${i + 1}`,
}));

export function Pictures() {
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
        <div className={styles.photoList}>
          {MOCK_IMAGES.map((img) => (
            <div key={img.id} className={styles.photoItem}>
              <Image
                src={img.src}
                alt={img.alt}
                width={640}
                height={640}
                className={styles.photo}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
