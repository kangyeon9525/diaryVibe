"use client";

import Image from "next/image";
import { Fragment } from "react";

import { Button } from "@/commons/components/button";
import { Input } from "@/commons/components/input";
import {
  Emotion,
  type Emotion as EmotionType,
  getEmotionColor,
  getEmotionLabel,
  getEmotionImageSrc,
} from "@/commons/constants/enum";

import { useDiaryBinding } from "./hooks/index.binding.hook";
import { useDiaryDelete } from "./hooks/index.delete.hook";
import { useRetrospectBinding } from "./hooks/index.retrospect.binding.hook";
import { useRetrospectForm } from "./hooks/index.retrospect.form.hook";
import { useDiaryUpdateForm } from "./hooks/index.update.hook";
import styles from "./styles.module.css";

/** 일기 쓰기 화면과 동일한 라디오 순서 */
const EMOTION_RADIO_ORDER: EmotionType[] = [
  Emotion.Happy,
  Emotion.Sad,
  Emotion.Surprise,
  Emotion.Angry,
  Emotion.Etc,
];

export default function DiariesDetail() {
  const { diary } = useDiaryBinding();
  const { openDeleteModal } = useDiaryDelete();
  const updateForm = useDiaryUpdateForm();
  const { retrospects } = useRetrospectBinding();
  const retrospectForm = useRetrospectForm(diary?.id ?? 0);

  if (!diary) {
    return (
      <div className={styles.container} data-testid="diary-detail-container">
        <div className={styles.gap64}></div>
        <div data-testid="diary-detail-not-found">일기를 찾을 수 없습니다.</div>
      </div>
    );
  }
  return (
    <div className={styles.container} data-testid="diary-detail-container">
      <div className={styles.gap64}></div>

      {!updateForm.isEditing ? (
        <div
          className={styles.detailStack}
          data-testid="diary-detail-view-mode"
        >
          {/* detail-title */}
          <div className={styles.detailTitle}>
            <div className={styles.titleSection}>
              <span className={styles.titleText} data-testid="diary-detail-title">
                {diary.title}
              </span>
            </div>
            <div className={styles.emotionDateRow}>
              <div className={styles.emotionArea}>
                <Image
                  src={getEmotionImageSrc(diary.emotion, "s")}
                  alt={getEmotionLabel(diary.emotion)}
                  width={32}
                  height={32}
                  data-testid="diary-detail-emotion-image"
                />
                <span
                  className={styles.emotionText}
                  style={{ color: getEmotionColor(diary.emotion) }}
                  data-testid="diary-detail-emotion-text"
                >
                  {getEmotionLabel(diary.emotion)}
                </span>
              </div>
              <div className={styles.dateArea}>
                <span className={styles.dateText} data-testid="diary-detail-date">
                  {diary.formattedDate}
                </span>
                <span className={styles.dateText}>작성</span>
              </div>
            </div>
          </div>

          <div className={styles.gap24}></div>

          {/* detail-content */}
          <div className={styles.detailContent}>
            <div className={styles.contentArea}>
              <span className={styles.contentLabel}>내용</span>
              <p className={styles.contentText} data-testid="diary-detail-content">
                {diary.content}
              </p>
            </div>
            <div className={styles.copyRow}>
              <button className={styles.copyButton}>
                <Image
                  src="/icons/copy_outline_light_m.svg"
                  alt="복사 아이콘"
                  width={24}
                  height={24}
                />
                <span className={styles.copyText}>내용 복사</span>
              </button>
            </div>
          </div>

          <div className={styles.gap24}></div>

          {/* detail-footer */}
          <div className={styles.detailFooter}>
            <Button
              type="button"
              variant="secondary"
              size="medium"
              theme="light"
              data-testid="diary-detail-update-enter"
              onClick={updateForm.enterEditMode}
            >
              수정
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="medium"
              theme="light"
              data-testid="diary-detail-delete-open"
              onClick={openDeleteModal}
            >
              삭제
            </Button>
          </div>
        </div>
      ) : (
        <form
          className={styles.updateForm}
          data-testid="diary-detail-edit-mode"
          onSubmit={updateForm.onSubmit}
          noValidate
        >
          <div className={styles.detailTitle}>
            <div className={styles.titleSection}>
              <Input
                variant="primary"
                theme="light"
                className={styles.updateTitleInput}
                aria-label="제목"
                data-testid="diary-detail-update-title"
                {...updateForm.register("title")}
              />
            </div>
            <div className={styles.emotionDateRow}>
              <div className={styles.updateEmotionRadios} aria-label="감정 선택">
                {EMOTION_RADIO_ORDER.map((value) => (
                  <label
                    key={value}
                    className={styles.updateRadioLabel}
                    data-testid={`diary-detail-update-emotion-${value}`}
                  >
                    <input
                      type="radio"
                      name="diary-detail-update-emotion"
                      value={value}
                      checked={updateForm.emotion === value}
                      onChange={() => updateForm.setEmotion(value)}
                      className={styles.updateRadioInputHidden}
                    />
                    <Image
                      src={
                        updateForm.emotion === value
                          ? "/icons/radio_fill_light_m.svg"
                          : "/icons/radio_outline_light_m.svg"
                      }
                      alt=""
                      width={24}
                      height={24}
                      aria-hidden
                    />
                    <span className={styles.updateRadioText}>
                      {getEmotionLabel(value)}
                    </span>
                  </label>
                ))}
              </div>
              <div className={styles.dateArea}>
                <span className={styles.dateText} data-testid="diary-detail-date">
                  {diary.formattedDate}
                </span>
                <span className={styles.dateText}>작성</span>
              </div>
            </div>
          </div>

          <div className={styles.gap24}></div>

          <div className={styles.detailContent}>
            <div className={styles.updateContentArea}>
              <span className={styles.contentLabel}>내용</span>
              <textarea
                className={styles.updateContentTextarea}
                rows={4}
                aria-label="내용"
                data-testid="diary-detail-update-content"
                {...updateForm.register("content")}
              />
            </div>
          </div>

          <div className={styles.gap24}></div>

          <div className={styles.detailFooter}>
            <Button
              type="submit"
              variant="primary"
              size="medium"
              theme="light"
              data-testid="diary-detail-update-submit"
              disabled={updateForm.isSubmitDisabled}
            >
              수정하기
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="medium"
              theme="light"
              data-testid="diary-detail-delete-open"
              onClick={openDeleteModal}
            >
              삭제
            </Button>
          </div>
        </form>
      )}

      <div className={styles.gap24}></div>

      {/* retrospect-input */}
      <form
        className={styles.retrospectInput}
        onSubmit={retrospectForm.onSubmit}
        noValidate
      >
        <span className={styles.retrospectLabel}>회고</span>
        <div className={styles.retrospectInputRow}>
          <div className={styles.retrospectInputWrapper}>
            <Input
              variant="primary"
              theme="light"
              placeholder="회고를 남겨보세요."
              data-testid="diary-detail-retrospect-func-form-content"
              {...retrospectForm.register("content")}
              disabled={updateForm.isEditing}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="large"
            theme="light"
            className={styles.submitButton}
            disabled={
              retrospectForm.isSubmitDisabled || updateForm.isEditing
            }
            data-testid="diary-detail-retrospect-func-form-submit"
          >
            입력
          </Button>
        </div>
      </form>

      <div className={styles.gap16}></div>

      {/* retrospect-list */}
      <div
        className={styles.retrospectList}
        data-testid="diary-detail-retrospect-list"
      >
        {retrospects.map((item, index) => (
          <Fragment key={item.id}>
            {index > 0 && <hr className={styles.retrospectDivider} />}
            <div
              className={styles.retrospectItem}
              data-testid="diary-detail-retrospect-binding-item"
            >
              <span
                className={styles.retrospectText}
                data-testid={`diary-detail-retrospect-binding-content-${item.id}`}
              >
                {item.content}
              </span>
              <span
                className={styles.retrospectDate}
                data-testid={`diary-detail-retrospect-binding-date-${item.id}`}
              >
                [{item.displayDate}]
              </span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
