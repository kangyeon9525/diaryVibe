"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { staticPaths } from "@/commons/constants/url";

export type CommonsLayoutLinkRouting = {
  diariesHref: string;
  picturesHref: string;
  isDiariesActive: boolean;
  isPicturesActive: boolean;
  isDiariesListPage: boolean;
};

export function useCommonsLayoutLinkRouting(): CommonsLayoutLinkRouting {
  const pathname = usePathname() ?? "";

  return useMemo(() => {
    const diariesPath = staticPaths.diaries;
    const picturesPath = staticPaths.pictures;

    const isDiariesActive =
      pathname === diariesPath || pathname.startsWith(`${diariesPath}/`);
    const isPicturesActive =
      pathname === picturesPath || pathname.startsWith(`${picturesPath}/`);

    return {
      diariesHref: diariesPath,
      picturesHref: picturesPath,
      isDiariesActive,
      isPicturesActive,
      isDiariesListPage: pathname === diariesPath,
    };
  }, [pathname]);
}
