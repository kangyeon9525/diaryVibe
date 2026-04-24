"use client";

import { useCallback, useMemo, useState } from "react";

import {
  isPictureFilterLayout,
  PictureFilterLayout,
  PICTURE_FILTER_LAYOUT_LIST,
} from "@/commons/constants/enum";

const DIMENSIONS_PX: Record<PictureFilterLayout, { width: number; height: number }> =
  {
    [PictureFilterLayout.Default]: { width: 640, height: 640 },
    [PictureFilterLayout.Landscape]: { width: 640, height: 480 },
    [PictureFilterLayout.Portrait]: { width: 480, height: 640 },
  };

export type PicturesFilterDimensions = { width: number; height: number };

export function usePicturesFilter() {
  const [layout, setLayout] = useState<PictureFilterLayout>(
    PictureFilterLayout.Default,
  );

  const dimensions = useMemo(
    (): PicturesFilterDimensions => DIMENSIONS_PX[layout],
    [layout],
  );

  const layoutOptions = useMemo(
    () =>
      PICTURE_FILTER_LAYOUT_LIST.map((value) => ({
        value,
        label: value,
      })),
    [],
  );

  const handleLayoutChange = useCallback((value: string) => {
    if (isPictureFilterLayout(value)) {
      setLayout(value);
    }
  }, []);

  return {
    layout,
    dimensions,
    layoutOptions,
    handleLayoutChange,
  };
}
