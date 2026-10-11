"use client";
import { icons } from "@/constants/icons";
import { memo } from "react";

export const SVGIcon = memo(function LoadSVGIcon({ name, ...rest }) {
  if (!name) {
    return null;
  }

  const SvgComponent = icons[name];
  return <SvgComponent {...rest} />;
});

export default SVGIcon;
