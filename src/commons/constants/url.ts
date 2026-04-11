/**
 * 앱 내 URL·접근 정책·레이아웃 노출 규칙 단일 관리.
 * Link href·router.push 등에는 `path` 또는 `buildPath()` 결과를 사용.
 */

export const RouteAccess = {
  /** 누구나 */
  Public: 'public',
  /** 회원 전용 */
  MemberOnly: 'memberOnly',
} as const;

export type RouteAccess = (typeof RouteAccess)[keyof typeof RouteAccess];

/** 라우트별 셸(헤더·배너·네비·푸터) 노출 — 프롬프트의 O/X */
export type RouteLayoutMeta = {
  header: boolean;
  /** header O일 때 로고 노출 */
  headerLogo: boolean;
  /** header O일 때 다크모드 토글 — 모든 경로에서 X */
  headerDarkModeToggle: boolean;
  banner: boolean;
  navigation: boolean;
  footer: boolean;
};

type StaticRouteDef = {
  path: string;
  access: RouteAccess;
  layout: RouteLayoutMeta;
};

type DynamicRouteDef = {
  /** 문서·디버그용 패턴 문자열 */
  pathPattern: string;
  access: RouteAccess;
  layout: RouteLayoutMeta;
  buildPath: (id: string | number) => string;
};

export const routes = {
  authLogin: {
    path: '/auth/login',
    access: RouteAccess.Public,
    layout: {
      header: false,
      headerLogo: false,
      headerDarkModeToggle: false,
      banner: false,
      navigation: false,
      footer: false,
    },
  } satisfies StaticRouteDef,

  authSignup: {
    path: '/auth/signup',
    access: RouteAccess.Public,
    layout: {
      header: false,
      headerLogo: false,
      headerDarkModeToggle: false,
      banner: false,
      navigation: false,
      footer: false,
    },
  } satisfies StaticRouteDef,

  diaries: {
    path: '/diaries',
    access: RouteAccess.Public,
    layout: {
      header: true,
      headerLogo: true,
      headerDarkModeToggle: false,
      banner: true,
      navigation: true,
      footer: true,
    },
  } satisfies StaticRouteDef,

  diaryDetail: {
    pathPattern: '/diaries/[id]',
    access: RouteAccess.MemberOnly,
    layout: {
      header: true,
      headerLogo: true,
      headerDarkModeToggle: false,
      banner: false,
      navigation: false,
      footer: true,
    },
    buildPath: (id: string | number) =>
      `/diaries/${encodeURIComponent(String(id))}`,
  } satisfies DynamicRouteDef,

  pictures: {
    path: '/pictures',
    access: RouteAccess.Public,
    layout: {
      header: true,
      headerLogo: true,
      headerDarkModeToggle: false,
      banner: true,
      navigation: true,
      footer: true,
    },
  } satisfies StaticRouteDef,
} as const;

export type RouteKey = keyof typeof routes;

/** 정적 경로만 (href에 그대로 사용) */
export const staticPaths = {
  authLogin: routes.authLogin.path,
  authSignup: routes.authSignup.path,
  diaries: routes.diaries.path,
  pictures: routes.pictures.path,
} as const;

/** 일기 상세 — `Link`·`router.push`용 */
export function getDiaryDetailPath(id: string | number): string {
  return routes.diaryDetail.buildPath(id);
}

/** pathname이 일기 상세인지 (선택적 레이아웃·가드용) */
export function matchDiaryDetailPath(pathname: string): string | null {
  const prefix = `${routes.diaries.path}/`;
  if (!pathname.startsWith(prefix)) return null;
  const rest = pathname.slice(prefix.length);
  if (!rest || rest.includes('/')) return null;
  return decodeURIComponent(rest);
}
