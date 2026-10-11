"use client";
import { brandColor, brandSecondary, colors } from "@/constants/common";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const DEFAULT_THEME_COLOR = "#0AB3A1";
export const useTheme = () => {
  const { section } = useParams();
  const style = useMemo(
    () => ({
      "--theme-color": brandColor[section] ?? DEFAULT_THEME_COLOR,
      "--theme-secondary-color": brandSecondary[section] ?? DEFAULT_THEME_COLOR,
      ...colors,
    }),
    [section]
  );
  return style;
};
