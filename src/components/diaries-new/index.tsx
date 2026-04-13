"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/commons/components/button";
import { Input } from "@/commons/components/input";
import {
  Emotion,
  type Emotion as EmotionType,
  getEmotionLabel,
} from "@/commons/constants/enum";

import styles from "./styles.module.css";

/** 피그마 Frame 61 라디오 순서(행복 → 슬픔 → 놀람 → 화남 → 기타) */
const EMOTION_RADIO_ORDER: EmotionType[] = [
  Emotion.Happy,
  Emotion.Sad,
  Emotion.Surprise,
  Emotion.Angry,
  Emotion.Etc,
];

export function DiariesNew() {
  const [emotion, setEmotion] = useState<EmotionType>(Emotion.Happy);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>일기 쓰기</h1>
      </header>

      <div className={styles.gap40} aria-hidden />

      <section className={styles.emotionBox} aria-label="기분 선택 영역">
        <p className={styles.emotionQuestion}>오늘 기분은 어땠나요?</p>
        <div className={styles.emotionRadios}>
          {EMOTION_RADIO_ORDER.map((value) => (
            <label key={value} className={styles.radioLabel}>
              <input
                type="radio"
                name="diary-emotion"
                value={value}
                checked={emotion === value}
                onChange={() => setEmotion(value)}
                className={styles.radioInputHidden}
              />
              <Image
                src={
                  emotion === value
                    ? "/icons/radio_fill_light_m.svg"
                    : "/icons/radio_outline_light_m.svg"
                }
                alt=""
                width={24}
                height={24}
                aria-hidden
              />
              <span className={styles.radioText}>{getEmotionLabel(value)}</span>
            </label>
          ))}
        </div>
      </section>

      <div className={styles.gap40} aria-hidden />

      <section className={styles.inputTitle} aria-label="제목 입력 영역">
        <span className={styles.fieldLabel}>제목</span>
        <Input
          variant="primary"
          theme="light"
          className={styles.inputFullWidth}
          placeholder="제목을 입력합니다."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </section>

      <div className={styles.gap24} aria-hidden />

      <section className={styles.inputContent} aria-label="내용 입력 영역">
        <span className={styles.fieldLabel}>내용</span>
        <textarea
          className={styles.contentTextarea}
          placeholder="내용을 입력합니다."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
      </section>

      <div className={styles.gap40} aria-hidden />

      <footer className={styles.footer}>
        <Button
          type="button"
          variant="secondary"
          theme="light"
          size="large"
          className={styles.footerButton}
        >
          닫기
        </Button>
        <Button
          type="button"
          variant="primary"
          theme="light"
          size="large"
          className={styles.footerButton}
          disabled
        >
          등록하기
        </Button>
      </footer>
    </div>
  );
}
