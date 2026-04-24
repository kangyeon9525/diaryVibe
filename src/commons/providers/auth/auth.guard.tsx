"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Modal } from "@/commons/components/modal";
import {
  RouteAccess,
  matchDiaryDetailPath,
  routes,
  staticPaths,
} from "@/commons/constants/url";
import { useModal } from "@/commons/providers/modal/modal.provider";

import { useAuth } from "./auth.provider";

function closeAllModals(close: () => void) {
  for (let i = 0; i < 10; i += 1) {
    close();
  }
}

/** React Strict Mode 이중 마운트 등에서 동일 경로 로그인 유도 모달이 중복 오픈되지 않도록 */
let lastLoginModalPathname: string | null = null;

function getRouteAccessForPathname(pathname: string): RouteAccess {
  if (pathname === routes.authLogin.path) return routes.authLogin.access;
  if (pathname === routes.authSignup.path) return routes.authSignup.access;
  if (matchDiaryDetailPath(pathname) !== null) return routes.diaryDetail.access;
  if (pathname === routes.diaries.path) return routes.diaries.access;
  if (pathname === routes.pictures.path) return routes.pictures.access;
  return RouteAccess.Public;
}

const isTestEnv = process.env.NEXT_PUBLIC_TEST_ENV === "test";

type AuthGuardProps = {
  children: ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { open, close } = useModal();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    setAuthReady(true);
  }, []);

  const requiredAccess = useMemo(
    () => getRouteAccessForPathname(pathname),
    [pathname],
  );

  const openLoginRequiredModal = useCallback(() => {
    open(
      <div>
        <Modal
          variant="info"
          actions="single"
          title="로그인해 주세요"
          description="이 페이지를 이용하려면 로그인이 필요합니다."
          primaryLabel="확인"
          onPrimaryClick={() => {
            closeAllModals(close);
            lastLoginModalPathname = null;
            router.push(staticPaths.authLogin);
          }}
        />
      </div>,
    );
  }, [close, open, router]);

  const openRef = useRef(openLoginRequiredModal);
  openRef.current = openLoginRequiredModal;

  useEffect(() => {
    if (!authReady || isTestEnv) return;

    if (requiredAccess !== RouteAccess.MemberOnly) {
      lastLoginModalPathname = null;
      return;
    }

    if (isLoggedIn) {
      lastLoginModalPathname = null;
      return;
    }

    if (lastLoginModalPathname === pathname) return;
    lastLoginModalPathname = pathname;
    openRef.current();
  }, [authReady, isLoggedIn, pathname, requiredAccess]);

  const canRenderChildren =
    authReady &&
    (isTestEnv ||
      requiredAccess === RouteAccess.Public ||
      (requiredAccess === RouteAccess.MemberOnly && isLoggedIn));

  if (!canRenderChildren) {
    return <div aria-busy="true" className="min-h-screen w-full" />;
  }

  return <>{children}</>;
}
