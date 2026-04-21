import { palette } from './color';

/**
 * 일기 감정 타입. 화면 표시 문구·에셋·색은 `emotionConfig`와 동기화.
 */
export const Emotion = {
  Happy: 'Happy',
  Sad: 'Sad',
  Angry: 'Angry',
  Surprise: 'Surprise',
  Etc: 'Etc',
} as const;

export type Emotion = (typeof Emotion)[keyof typeof Emotion];

export const EMOTION_LIST = [
  Emotion.Happy,
  Emotion.Sad,
  Emotion.Angry,
  Emotion.Surprise,
  Emotion.Etc,
] as const satisfies readonly Emotion[];

type EmotionConfig = {
  /** 화면 표시용 한글 라벨 */
  label: string;
  /** `public/images` 기준 파일명 (경로 조합용) */
  imageFileM: string;
  imageFileS: string;
  /** 피그마 팔레트 토큰 기준 60단계 색 */
  color: string;
};

export const emotionConfig: Record<Emotion, EmotionConfig> = {
  Happy: {
    label: '행복해요',
    imageFileM: 'emotion-happy-m.png',
    imageFileS: 'emotion-happy-s.png',
    color: palette.red['60'],
  },
  Sad: {
    label: '슬퍼요',
    imageFileM: 'emotion-sad-m.png',
    imageFileS: 'emotion-sad-s.png',
    color: palette.blue['60'],
  },
  Angry: {
    label: '화나요',
    imageFileM: 'emotion-angry-m.png',
    imageFileS: 'emotion-angry-s.png',
    color: palette.gray['60'],
  },
  Surprise: {
    label: '놀랐어요',
    imageFileM: 'emotion-surprise-m.png',
    imageFileS: 'emotion-surprise-s.png',
    color: palette.yellow['60'],
  },
  Etc: {
    label: '기타',
    imageFileM: 'emotion-etc-m.png',
    imageFileS: 'emotion-etc-s.png',
    color: palette.green['60'],
  },
};

export type EmotionImageSize = 'm' | 's';

/** `public/images` 기준 URL (Next.js `Image`·`img src`에 그대로 사용) */
export function getEmotionImageSrc(
  emotion: Emotion,
  size: EmotionImageSize,
): string {
  const file =
    size === 'm'
      ? emotionConfig[emotion].imageFileM
      : emotionConfig[emotion].imageFileS;
  return `/images/${file}`;
}

export function getEmotionLabel(emotion: Emotion): string {
  return emotionConfig[emotion].label;
}

export function getEmotionColor(emotion: Emotion): string {
  return emotionConfig[emotion].color;
}

export function isEmotion(value: string): value is Emotion {
  return EMOTION_LIST.includes(value as Emotion);
}
