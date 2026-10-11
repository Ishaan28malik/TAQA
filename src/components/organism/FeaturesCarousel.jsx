import React, { useState, useEffect } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { Typography } from "../atoms/Typography/Typography";
import data from "../../constants/residential.json";

import styles from "./featuresCarousel.module.css";
import { useParams } from "next/navigation";

const FeaturesCarousel = ({ featureCarouselImage }) => {
  // Assuming `region` and `language` are props now, or they could be fetched from `useParams` if in a route
  const { region, language, section } = useParams();
  const brandingSection = data[region]?.[language]?.overview?.brandingSection;
  const [translateXPercentage, setTranslateXPercentage] = useState(70);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile] = useIsMobile();

  useEffect(() => {
    const updateTranslateX = () => {
      if (window.innerWidth <= 508) {
        setTranslateXPercentage(35);
      } else if (window.innerWidth <= 1024) {
        setTranslateXPercentage(20);
      } else {
        setTranslateXPercentage(30);
      }
    };

    updateTranslateX();
    window.addEventListener("resize", updateTranslateX);

    return () => window.removeEventListener("resize", updateTranslateX);
  }, []);

  useEffect(() => {
    let timer;
    if (isMobile) {
      timer = setInterval(() => {
        setCurrentSlide(
          (prevSlide) => (prevSlide + 1) % (featureCarouselImage?.length || 1)
        );
      }, 3000);
    }
    return () => timer && clearInterval(timer);
  }, [isMobile, featureCarouselImage?.length]);

  if (!brandingSection) {
    return <div>No data available</div>;
  }

  return (
    <div
      className={styles.sectionheaderunit}
      data-aos="fade-up"
      suppressHydrationWarning
    >
      <div className={styles.featuresCarouselText}>
        <Typography text={brandingSection.line1} variant="h2" />
        <Typography text={brandingSection.line2} variant="h2" />
        <Typography
          text={
            section === "residential"
              ? brandingSection.descriptionResidential
              : brandingSection.descriptionBusiness
          }
          variant="body4"
          className={styles.sectionheaderunitText}
        />
      </div>
      <div id="carousel" className={styles.carousel}>
        <div className={styles.carouseltrackcontainer}>
          <ul
            className={styles.carouseltrack}
            style={{
              transform:
                language === "en-us"
                  ? `translateX(-${currentSlide * translateXPercentage}%)`
                  : `translateX(+${currentSlide * translateXPercentage}%)`,
              overflow: isMobile ? "hidden" : "scroll",
              width: isMobile ? 'fit-content' : '100%'
            }}
          >
            {featureCarouselImage?.map((image, index) => (
              <li
                className={`${
                  index === currentSlide ? styles.currentslide : ""
                }`}
                key={index}
              >
                {image}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.carouselindicators}>
        {featureCarouselImage?.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              index === currentSlide ? styles.active : ""
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesCarousel;
