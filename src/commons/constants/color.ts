/**
 * Figma Foundation Color (node 1:7593) — 프리미티브 팔레트.
 * CSS 변수와 동기화: src/app/globals.css 의 --palette-* / --color-*
 */

export const palette = {
  blue: {
    '05': '#F0F7FF',
    '10': '#DBEEFF',
    '20': '#BDDBFF',
    '30': '#93BEFF',
    '40': '#6DA5FA',
    '50': '#497CFF',
    '60': '#3A5CF3',
    '70': '#274AE1',
    '80': '#1530A6',
    '90': '#0B2184',
  },
  gray: {
    white: '#FFFFFF',
    '05': '#F2F2F2',
    '10': '#E4E4E4',
    '20': '#D4D3D3',
    '30': '#C7C7C7',
    '40': '#ABABAB',
    '50': '#919191',
    '60': '#777777',
    '70': '#5F5F5F',
    '80': '#333333',
    '90': '#1C1C1C',
    black: '#000000',
  },
  red: {
    '05': '#FDD7DC',
    '10': '#F797A4',
    '20': '#F4677A',
    '30': '#F03851',
    '40': '#E4112E',
    '50': '#B40E24',
    '60': '#850A1B',
  },
  green: {
    '05': '#D3F3E0',
    '10': '#92E6B9',
    '20': '#15D66F',
    '30': '#12B75F',
    '40': '#109C51',
    '50': '#0E723C',
    '60': '#084424',
  },
  yellow: {
    '05': '#FFE499',
    '10': '#FFD666',
    '20': '#FFC933',
    '30': '#FFB300',
    '40': '#EBA500',
    '50': '#D69600',
    '60': '#B27D00',
  },
  coolGray: {
    '01': '#F8F8FA',
    '05': '#F6F6F9',
    '10': '#EDEEF2',
    '20': '#DDDFE5',
    '30': '#D2D4DD',
    '40': '#C7C9D5',
    '50': '#BBBECD',
    '60': '#B0B3C4',
  },
} as const;

/** Figma Primary Gradient: #6DA5FA → #92EAF5 */
export const gradientPrimary =
  'linear-gradient(127deg, #6DA5FA 0%, #92EAF5 100%)';

/** Skeleton shimmer: transparent → white 60% → transparent */
export const gradientSkeleton =
  'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 48.5%, rgba(255,255,255,0) 100%)';

/** globals.css 에 정의된 시맨틱 토큰 이름 (접두사 없이 키만) */
export const semanticColorKeys = [
  'background',
  'foreground',
  'surface',
  'surface-muted',
  'border',
  'border-strong',
  'primary',
  'primary-hover',
  'on-primary',
  'error',
  'success',
  'warning',
  'muted',
] as const;

export type SemanticColorKey = (typeof semanticColorKeys)[number];

const CSS_PREFIX = '--color-';

/** CSS에서 var(--color-*) 로 쓰는 값과 동일한 참조 (인라인 스타일 등) */
export function cssVar(name: SemanticColorKey): string {
  return `var(${CSS_PREFIX}${name})`;
}

export type Palette = typeof palette;
