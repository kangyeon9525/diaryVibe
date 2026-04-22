"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import { routes, staticPaths } from "@/commons/constants/url";

/** `routes.authLogin.path`(`/auth/login`)와 동일 세그먼트 접두사 */
const AUTH_PATH_PREFIX = routes.authLogin.path.replace(/\/[^/]+$/, "");

const STORAGE_ACCESS_TOKEN = "accessToken";
const STORAGE_USER = "user";

export type AuthStoredUser = {
  _id: string;
  name: string;
};

type AuthContextValue = {
  isLoggedIn: boolean;
  user: AuthStoredUser | null;
  /** `url.ts`의 로그인 경로(`/auth/login`)로 이동 */
  navigateToLogin: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readAuthState(): {
  isLoggedIn: boolean;
  user: AuthStoredUser | null;
} {
  if (typeof window === "undefined") {
    return { isLoggedIn: false, user: null };
  }

  const token = window.localStorage.getItem(STORAGE_ACCESS_TOKEN);
  const isLoggedIn = Boolean(token?.length);

  if (!isLoggedIn) {
    return { isLoggedIn: false, user: null };
  }

  const raw = window.localStorage.getItem(STORAGE_USER);
  if (!raw) {
    return { isLoggedIn: true, user: null };
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (
      parsed &&
      typeof parsed === "object" &&
      "_id" in parsed &&
      "name" in parsed
    ) {
      return {
        isLoggedIn: true,
        user: {
          _id: String((parsed as { _id: unknown })._id),
          name: String((parsed as { name: unknown }).name),
        },
      };
    }
  } catch {
    // ignore invalid JSON
  }

  return { isLoggedIn: true, user: null };
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
  }
  return ctx;
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthStoredUser | null>(null);

  const syncFromStorage = useCallback(() => {
    const next = readAuthState();
    setIsLoggedIn(next.isLoggedIn);
    setUser(next.user);
  }, []);

  useEffect(() => {
    syncFromStorage();
  }, [syncFromStorage, pathname]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (
        e.key === STORAGE_ACCESS_TOKEN ||
        e.key === STORAGE_USER ||
        e.key === null
      ) {
        syncFromStorage();
      }
    };

    const onFocus = () => {
      syncFromStorage();
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        syncFromStorage();
      }
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [syncFromStorage]);

  useEffect(() => {
    if (!pathname.startsWith(AUTH_PATH_PREFIX)) return;
    const id = window.setInterval(() => {
      syncFromStorage();
    }, 500);
    return () => window.clearInterval(id);
  }, [pathname, syncFromStorage]);

  const navigateToLogin = useCallback(() => {
    router.push(staticPaths.authLogin);
  }, [router]);

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_ACCESS_TOKEN);
      window.localStorage.removeItem(STORAGE_USER);
    }
    setIsLoggedIn(false);
    setUser(null);
    router.push(staticPaths.authLogin);
  }, [router]);

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoggedIn,
      user,
      navigateToLogin,
      logout,
    }),
    [isLoggedIn, user, navigateToLogin, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
