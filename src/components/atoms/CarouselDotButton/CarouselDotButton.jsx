"use client";
/**
 * Ref: https://codesandbox.io/s/6qc3fp?file=/src/js/EmblaCarouselDotButton.jsx:65-852
 */
import { useCallback, useEffect, useState } from "react";
import styles from "./carouselDotButton.module.css";
import classNames from "classnames";

export const useDotButton = (emblaApi) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onDotButtonClick = useCallback(
    (index) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

export const CarouselDotButton = ({ handleClick, isActive }) => {
  const classes = classNames({
    [styles.dot]: true,
    [styles.active]: isActive,
  });
  return <div onClick={handleClick} className={classes} role="button" />;
};
