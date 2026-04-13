import Image from 'next/image';

import { Button } from '@/commons/components/button';
import {
  Emotion,
  getEmotionColor,
  getEmotionLabel,
} from '@/commons/constants/enum';

import styles from './styles.module.css';

const mockDiary = {
  emotion: Emotion.Happy,
  title: '이것은 타이틀 입니다.',
  date: '2024. 07. 12',
  content:
    '내용이 들어갑니다'.repeat(45),
};

export default function DiariesDetail() {
  return (
    <div className={styles.container}>
      <div className={styles.gap64}></div>

      {/* detail-title */}
      <div className={styles.detailTitle}>
        <div className={styles.titleSection}>
          <span className={styles.titleText}>{mockDiary.title}</span>
        </div>
        <div className={styles.emotionDateRow}>
          <div className={styles.emotionArea}>
            <Image
              src={`/images/emotion-${mockDiary.emotion.toLowerCase()}-s.png`}
              alt={getEmotionLabel(mockDiary.emotion)}
              width={32}
              height={32}
            />
            <span
              className={styles.emotionText}
              style={{ color: getEmotionColor(mockDiary.emotion) }}
            >
              {getEmotionLabel(mockDiary.emotion)}
            </span>
          </div>
          <div className={styles.dateArea}>
            <span className={styles.dateText}>{mockDiary.date}</span>
            <span className={styles.dateText}>작성</span>
          </div>
        </div>
      </div>

      <div className={styles.gap24}></div>

      {/* detail-content */}
      <div className={styles.detailContent}>
        <div className={styles.contentArea}>
          <span className={styles.contentLabel}>내용</span>
          <p className={styles.contentText}>{mockDiary.content}</p>
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
        <Button variant="secondary" size="medium" theme="light">
          수정
        </Button>
        <Button variant="secondary" size="medium" theme="light">
          삭제
        </Button>
      </div>

      <div className={styles.gap24}></div>
      <div className={styles.retrospectInput}>retrospect-input</div>
      <div className={styles.gap16}></div>
      <div className={styles.retrospectList}>retrospect-list</div>
    </div>
  );
}
