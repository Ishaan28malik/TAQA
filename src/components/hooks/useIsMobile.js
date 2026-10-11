"use client";

import { useEffect, useState } from "react";

export const checkIfMobile = (window) =>
  window?.innerWidth <= 768 ||
  (window?.innerHeight < window?.innerWidth && window?.innerWidth <= 1084);

export const checkIfLandscape = (window) =>
  window?.innerHeight < window?.innerWidth && window?.innerWidth <= 1084;

export const checkIfWide = (window) =>
  window?.innerWidth > 1550;

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => checkIfMobile(globalThis));
  const [isLandscape, setIsLandscape] = useState(() =>
    checkIfLandscape(globalThis)
  );
  const [isWide, setIsWide] = useState(() =>
    checkIfWide(globalThis)
  );

  useEffect(() => {
    const setIfMobileOrNot = () => {
      setIsMobile(checkIfMobile(window));
      setIsLandscape(checkIfLandscape(window));
      setIsWide(checkIfWide(globalThis));
    };
    window.addEventListener("resize", setIfMobileOrNot);
    return () => {
      window.removeEventListener("resize", setIfMobileOrNot);
    };
  }, []);

  return [isMobile, isLandscape, isWide];
};
