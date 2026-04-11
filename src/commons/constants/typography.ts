/**
 * Figma Foundation Typography (node 1:7885, Typography KR).
 * CSS 변수와 동기화: src/app/globals.css 의 --font-sans-*, --typo-*
 *
 * - 국문: Pretendard / 영문·숫자: SUIT (피그마 가이드). `fontFamily.en`만 교체해도 영문 스택 변경 가능.
 * - 웹 헤드라인(webHeadline*)은 모바일·데스크톱 픽셀 분기, 나머지는 피그마 단일 스펙을 양 구간 동일 값으로 둠.
 */

export const TYPOGRAPHY_DESKTOP_MIN_WIDTH_PX = 1024;

const TYPO_PREFIX = '--typo-';

export type FontWeightToken = 400 | 500 | 600 | 700 | 800;

export type TextStyleSpec = {
  fontSize: number;
  lineHeight: number;
  fontWeight: FontWeightToken;
  letterSpacing: number;
};

export type ResponsiveTextStyle = {
  mobile: TextStyleSpec;
  desktop: TextStyleSpec;
};

/** 피그마: 국문 Pretendard, 영문/숫자 SUIT — 폰트 파일은 별도 로드 필요 */
export const fontFamily = {
  kr: '"Pretendard Variable", Pretendard, system-ui, -apple-system, sans-serif',
  en: '"SUIT Variable", SUIT, system-ui, -apple-system, sans-serif',
} as const;

/**
 * 영문 타이포만 다른 스케일/굵기로 바꿀 때 이 객체의 `en` 쪽을 수정하면 됨.
 * 현재는 KR과 동일 스펙(가족만 globals.css에서 분기).
 */
export const textStyles = {
  webHeadline01: {
    mobile: {
      fontSize: 36,
      lineHeight: 48,
      fontWeight: 600,
      letterSpacing: 0,
    },
    desktop: {
      fontSize: 48,
      lineHeight: 60,
      fontWeight: 600,
      letterSpacing: 0,
    },
  },
  webHeadline02: {
    mobile: {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: 600,
      letterSpacing: 0,
    },
    desktop: {
      fontSize: 36,
      lineHeight: 48,
      fontWeight: 600,
      letterSpacing: 0,
    },
  },
  webHeadline03: {
    mobile: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: 600,
      letterSpacing: 0,
    },
    desktop: {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: 600,
      letterSpacing: 0,
    },
  },
  headline01: {
    mobile: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: 700,
      letterSpacing: 0,
    },
    desktop: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: 700,
      letterSpacing: 0,
    },
  },
  headline02: {
    mobile: {
      fontSize: 22,
      lineHeight: 30,
      fontWeight: 800,
      letterSpacing: 0,
    },
    desktop: {
      fontSize: 22,
      lineHeight: 30,
      fontWeight: 800,
      letterSpacing: 0,
    },
  },
  headline03: {
    mobile: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: 700,
      letterSpacing: 0,
    },
    desktop: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: 700,
      letterSpacing: 0,
    },
  },
  title01: {
    mobile: {
      fontSize: 18,
      lineHeight: 24,
      fontWeight: 700,
      letterSpacing: 0,
    },
    desktop: {
      fontSize: 18,
      lineHeight: 24,
      fontWeight: 700,
      letterSpacing: 0,
    },
  },
  title02: {
    mobile: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: 700,
      letterSpacing: 0,
    },
    desktop: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: 700,
      letterSpacing: 0,
    },
  },
  title03: {
    mobile: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: 700,
      letterSpacing: 0,
    },
    desktop: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: 700,
      letterSpacing: 0,
    },
  },
  subTitle01: {
    mobile: {
      fontSize: 14,
      lineHeight: 22,
      fontWeight: 600,
      letterSpacing: 0,
    },
    desktop: {
      fontSize: 14,
      lineHeight: 22,
      fontWeight: 600,
      letterSpacing: 0,
    },
  },
  subTitle02: {
    mobile: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: 600,
      letterSpacing: 0,
    },
    desktop: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: 600,
      letterSpacing: 0,
    },
  },
  body01: {
    mobile: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: 500,
      letterSpacing: 0,
    },
    desktop: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: 500,
      letterSpacing: 0,
    },
  },
  body02M: {
    mobile: {
      fontSize: 14,
      lineHeight: 22,
      fontWeight: 500,
      letterSpacing: 0,
    },
    desktop: {
      fontSize: 14,
      lineHeight: 22,
      fontWeight: 500,
      letterSpacing: 0,
    },
  },
  body03: {
    mobile: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: 500,
      letterSpacing: 0,
    },
    desktop: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: 500,
      letterSpacing: 0,
    },
  },
  body01Regular: {
    mobile: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: 400,
      letterSpacing: 0,
    },
    desktop: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: 400,
      letterSpacing: 0,
    },
  },
  body02S: {
    mobile: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: 400,
      letterSpacing: 0,
    },
    desktop: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: 400,
      letterSpacing: 0,
    },
  },
  body03Regular: {
    mobile: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: 400,
      letterSpacing: 0,
    },
    desktop: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: 400,
      letterSpacing: 0,
    },
  },
  caption01: {
    mobile: {
      fontSize: 12,
      lineHeight: 14,
      fontWeight: 600,
      letterSpacing: 0,
    },
    desktop: {
      fontSize: 12,
      lineHeight: 14,
      fontWeight: 600,
      letterSpacing: 0,
    },
  },
  caption02M: {
    mobile: {
      fontSize: 10,
      lineHeight: 12,
      fontWeight: 600,
      letterSpacing: 0,
    },
    desktop: {
      fontSize: 10,
      lineHeight: 12,
      fontWeight: 600,
      letterSpacing: 0,
    },
  },
  caption02S: {
    mobile: {
      fontSize: 10,
      lineHeight: 12,
      fontWeight: 500,
      letterSpacing: 0,
    },
    desktop: {
      fontSize: 10,
      lineHeight: 12,
      fontWeight: 500,
      letterSpacing: 0,
    },
  },
  caption03: {
    mobile: {
      fontSize: 8,
      lineHeight: 12,
      fontWeight: 600,
      letterSpacing: 0,
    },
    desktop: {
      fontSize: 8,
      lineHeight: 12,
      fontWeight: 600,
      letterSpacing: 0,
    },
  },
} as const satisfies Record<string, ResponsiveTextStyle>;

export type TextStyleKey = keyof typeof textStyles;

const TOKEN_CSS_SLUG: Record<TextStyleKey, string> = {
  webHeadline01: 'web-headline-01',
  webHeadline02: 'web-headline-02',
  webHeadline03: 'web-headline-03',
  headline01: 'headline-01',
  headline02: 'headline-02',
  headline03: 'headline-03',
  title01: 'title-01',
  title02: 'title-02',
  title03: 'title-03',
  subTitle01: 'sub-title-01',
  subTitle02: 'sub-title-02',
  body01: 'body-01',
  body02M: 'body-02-m',
  body03: 'body-03',
  body01Regular: 'body-01-regular',
  body02S: 'body-02-s',
  body03Regular: 'body-03-regular',
  caption01: 'caption-01',
  caption02M: 'caption-02-m',
  caption02S: 'caption-02-s',
  caption03: 'caption-03',
};

/** CSS 커스텀 프로퍼티 이름 (예: `--typo-web-headline-01-font-size`) */
export function typoCssName(
  token: TextStyleKey,
  prop: 'font-size' | 'line-height' | 'font-weight' | 'letter-spacing',
): string {
  return `${TYPO_PREFIX}${TOKEN_CSS_SLUG[token]}-${prop}`;
}

/** `var(--typo-...)` 참조 */
export function typoVar(
  token: TextStyleKey,
  prop: 'font-size' | 'line-height' | 'font-weight' | 'letter-spacing',
): string {
  return `var(${typoCssName(token, prop)})`;
}

export type TypoCssProps = {
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing: string;
};

/** React/CSS 인라인용: 브레이크포인트는 CSS 변수가 이미 뷰포트에 맞게 바뀌므로 그대로 사용 */
export function typoStyleVars(token: TextStyleKey): TypoCssProps {
  return {
    fontSize: typoVar(token, 'font-size'),
    lineHeight: typoVar(token, 'line-height'),
    fontWeight: typoVar(token, 'font-weight'),
    letterSpacing: typoVar(token, 'letter-spacing'),
  };
}
