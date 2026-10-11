"use client";
import { useCallback, useEffect, useState } from "react";
import { Typography } from "../Typography/Typography";
import styles from "./customCarousel.module.css";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useParams } from "next/navigation";
import { LinkButton } from "../LinkButton/LinkButton";
import { useTheme } from "@/components/hooks/useTheme";
import {
  CarouselDotButton,
  useDotButton,
} from "../CarouselDotButton/CarouselDotButton";

Autoplay.globalOptions = { delay: 4000 };

export const CustomCarousel = ({
  showControls = false,
  slidesData = [],
  autoplay = false,
  component: SlideComponent,
  title,
  description,
  titleColor,
  containerCustomStyle = {},
  titleCustomContainerStyle = {},
  customDotContainerStyles = {},
  backgroundColor = "#FAFAFA",
  titleVariant = "h2",
  descriptionVariant = "body4",
}) => {
  const { language } = useParams();
  const themeStyle = useTheme();

  const direction = language?.toLocaleLowerCase?.() === "en-us" ? "ltr" : "rtl";
  const [carouselRef, carousalAPI] = useEmblaCarousel(
    {
      align: "start",
      slidesToScroll: "auto",
      inViewThreshold: 1,
      loop: !!autoplay,
      direction,
    },
    autoplay ? [Autoplay()] : []
  );
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(carousalAPI);
  const [canScrollNext, setCanScrollNext] = useState(
    carousalAPI?.canScrollNext
  );
  const [canScrollPrev, setCanScrollPrev] = useState(
    carousalAPI?.canScrollPrev
  );
  const [isControlRequired, setIsControlRequired] = useState(showControls);

  const setControlsConfig = useCallback((carousalAPI) => {
    const canScrollPrev = carousalAPI.canScrollPrev();
    const canScrollNext = carousalAPI.canScrollNext();
    setCanScrollPrev(canScrollPrev);
    setCanScrollNext(canScrollNext);
    if (!canScrollNext && !canScrollPrev) {
      setIsControlRequired(false);
    } else {
      setIsControlRequired(true);
    }
  }, []);

  /**Controlling visibility of carousel control */
  useEffect(() => {
    if (carousalAPI) {
      setControlsConfig(carousalAPI);
      carousalAPI.on("reInit", setControlsConfig);
      carousalAPI.on("select", setControlsConfig);
    }
  }, [carousalAPI]);

  const handleNextBtnClick = useCallback(() => {
    if (carousalAPI) {
      carousalAPI.scrollNext();
      setControlsConfig(carousalAPI);
    }
  }, [carousalAPI]);

  const handlePrevBtnClick = useCallback(() => {
    if (carousalAPI) {
      carousalAPI.scrollPrev();
      setControlsConfig(carousalAPI);
    }
  }, [carousalAPI]);

  return (
    <div
      className={styles.container}
      style={{ backgroundColor, ...containerCustomStyle }}
      data-aos="fade-up"
      suppressHydrationWarning
    >
      <div className={styles.headerContainer}>
        <div
          className={styles.leftHeaderContainer}
          style={{ ...titleCustomContainerStyle }}
        >
          <Typography
            type="heading"
            variant={titleVariant}
            text={title}
            color={titleColor || themeStyle["--color-font-black"]}
          />
          <Typography
            type="text"
            variant={descriptionVariant}
            text={description}
          />
        </div>
        {showControls &&
          isControlRequired &&
          !!carousalAPI?.scrollNext &&
          !!carousalAPI?.scrollPrev && (
            <div className={styles.rightHeaderContainer}>
              <LinkButton
                size="md"
                type="tertiary"
                iconName="backwardArrow"
                onClick={handlePrevBtnClick}
                customClass={`${styles.btnCustom} ${
                  !canScrollPrev ? styles.disabledBtn : ""
                }`}
                disabled={!canScrollPrev}
                hasBorder
                ariaLabel="scroll to the left"
                aria-disabled={!canScrollPrev}
                role="button"
              />
              <LinkButton
                size="md"
                type="tertiary"
                iconName="forwardArrow"
                onClick={handleNextBtnClick}
                customClass={`${styles.btnCustom} ${
                  !canScrollNext ? styles.disabledBtn : ""
                }`}
                disabled={!canScrollNext}
                hasBorder
                ariaLabel="scroll to the right"
                aria-disabled={!canScrollNext}
                role="button"
              />
            </div>
          )}
      </div>
      {Array.isArray(slidesData) && (
        <div className={styles.carousel} ref={carouselRef} >
          <ul
            className={styles.slidesContainer}
            style={{
              "--carousel-terminal-gap":
                !!autoplay && isControlRequired ? "10px" : "70px",
            }}
            id={`slidesContainerFor${title}`}
          >
            {slidesData.map((slideProps, index) => (
              <SlideComponent
                key={`${title}-slides-${index}`}
                {...slideProps}
              />
            ))}
          </ul>
        </div>
      )}
      {isControlRequired && scrollSnaps.length > 1 && (
        <div
          className={styles.dotNavigatorContainer}
          style={{ ...customDotContainerStyles }}
        >
          {scrollSnaps.map((_, index) => (
            <CarouselDotButton
              key={`dot-slide-${index}`}
              isActive={selectedIndex === index}
              handleClick={() => {
                onDotButtonClick(index);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
