"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { matchDiaryDetailPath, routes } from "@/commons/constants/url";

export type CommonsLayoutAreaVisibility = {
  showHeader: boolean;
  showHeaderLogo: boolean;
  showBanner: boolean;
  showNavigation: boolean;
  showFooter: boolean;
};

function layoutMetaForPathname(pathname: string) {
  const p = pathname || "";

  if (p === routes.authLogin.path) return routes.authLogin.layout;
  if (p === routes.authSignup.path) return routes.authSignup.layout;
  if (p === routes.diaries.path) return routes.diaries.layout;
  if (p === routes.pictures.path) return routes.pictures.layout;
  if (matchDiaryDetailPath(p) !== null) return routes.diaryDetail.layout;

  return routes.diaries.layout;
}

export function useCommonsLayoutArea(): CommonsLayoutAreaVisibility {
  const pathname = usePathname() ?? "";

  return useMemo(() => {
    const meta = layoutMetaForPathname(pathname);
    return {
      showHeader: meta.header,
      showHeaderLogo: meta.headerLogo,
      showBanner: meta.banner,
      showNavigation: meta.navigation,
      showFooter: meta.footer,
    };
  }, [pathname]);
}
