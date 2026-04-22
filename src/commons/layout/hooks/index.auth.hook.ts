"use client";

import { useMemo } from "react";

import { useAuth } from "@/commons/providers/auth/auth.provider";

export type CommonsLayoutAuthView = {
  isLoggedIn: boolean;
  /** 헤더에 표시할 사용자 이름 */
  displayName: string;
  onPressLogin: () => void;
  onPressLogout: () => void;
};

export function useCommonsLayoutAuth(): CommonsLayoutAuthView {
  const { isLoggedIn, user, navigateToLogin, logout } = useAuth();

  return useMemo(() => {
    const name = user?.name?.trim();
    const displayName =
      name && name.length > 0 ? name : "회원";

    return {
      isLoggedIn,
      displayName,
      onPressLogin: navigateToLogin,
      onPressLogout: logout,
    };
  }, [isLoggedIn, user?.name, navigateToLogin, logout]);
}
