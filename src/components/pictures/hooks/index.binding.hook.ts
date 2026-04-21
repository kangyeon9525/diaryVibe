"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

const DOG_BATCH_URL = "https://dog.ceo/api/breeds/image/random/6";

/** 약 2장(640px×2) 분량 아래로 루트를 확장해, 마지막 2마리 근접 시 추가 요청 */
const INFINITE_ROOT_MARGIN_BOTTOM = "1400px";

type DogApiResponse = {
  message: string[];
  status: string;
};

async function fetchDogBatch(): Promise<string[]> {
  const res = await fetch(DOG_BATCH_URL);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const data: (DogApiResponse & { message?: unknown }) = await res.json();
  if (!Array.isArray(data.message) || data.message.length === 0) {
    throw new Error("Invalid response");
  }
  return data.message.filter((u): u is string => typeof u === "string");
}

export type PictureDogItem = {
  key: string;
  src: string;
};

export function usePicturesBinding() {
  const query = useInfiniteQuery({
    queryKey: ["pictures", "dog-random-batch"],
    queryFn: fetchDogBatch,
    initialPageParam: 0,
    getNextPageParam: (_lastPage, allPages) => allPages.length,
  });

  const imageEntries: PictureDogItem[] =
    query.data?.pages.flatMap((urls, pageIdx) =>
      urls.map((src, i) => ({
        key: `p${pageIdx}-i${i}-${src}`,
        src,
      })),
    ) ?? [];

  const [sentinelEl, setSentinelEl] = useState<HTMLDivElement | null>(null);

  const { fetchNextPage, hasNextPage, isFetchingNextPage } = query;

  const sentinelRefCallback = useCallback((node: HTMLDivElement | null) => {
    setSentinelEl(node);
  }, []);

  useEffect(() => {
    if (!sentinelEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (
          entry?.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          void fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: `0px 0px ${INFINITE_ROOT_MARGIN_BOTTOM} 0px`,
        threshold: 0,
      },
    );

    observer.observe(sentinelEl);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, sentinelEl]);

  return {
    imageEntries,
    sentinelRefCallback,
    isInitialPending: query.isPending,
    isInitialError: query.isError,
    isFetchNextPageError: query.isFetchNextPageError,
    isFetchingNextPage,
  };
}
