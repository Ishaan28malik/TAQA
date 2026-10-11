"use client";

import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "./tipsCarousel.module.css";
import Image from "next/image";
import { LinkButton } from "../atoms/LinkButton/LinkButton";
import { Typography } from "../atoms/Typography/Typography";
import { useParams } from "next/navigation";
import data from "../../constants/constantsNew.json";
import { OldSiteRedirectModalContext } from "./OldSiteRedirectModalProvider/OldSiteRedirectModalProvider";
import airConditioner from "@/assets/images/airConditioner.png";
import saveElectricity from "@/assets/images/saveElectricity.png";
import efficientLighting from "@/assets/images/efficientLighting.png";
import wiseAppliances from "@/assets/images/wiseAppliances.png";
import saveWaterHome from "@/assets/images/saveWaterHome.png";
import saveWaterOutside from "@/assets/images/saveWaterOutside.png";
import waterUsage from "@/assets/images/waterUsage.png";
import { useTheme } from "../hooks/useTheme";
import { useIsMobile } from "../hooks/useIsMobile";

const createImageMapping = (tipsData) => {
  const mapping = {};
  tipsData.forEach((tip) => {
    switch (tip.alt) {
      case "Energy-friendly air conditioning":
        mapping[tip.title] = airConditioner;
        break;
      case "Easy ways to save electricity":
        mapping[tip.title] = saveElectricity;
        break;
      case "Energy-efficient Lighting":
        mapping[tip.title] = efficientLighting;
        break;
      case "Energy-wise appliances":
        mapping[tip.title] = wiseAppliances;
        break;
      case "Save water at home":
        mapping[tip.title] = saveWaterHome;
        break;
      case "Save water outside your home":
        mapping[tip.title] = saveWaterOutside;
        break;
      case "Work out water usage":
        mapping[tip.title] = waterUsage;
        break;
      default:
        break;
    }
  });
  return mapping;
};

const TipsCarousel = () => {
  const { handleRedirect } = useContext(OldSiteRedirectModalContext);
  const { section, language } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const themeStyle = useTheme();
  const [isMobile] = useIsMobile();

  const handleLearnMoreClick = (e, link) => {
    handleRedirect(e, link);
  };

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const updateIndexFromScroll = () => {
    if (!carouselRef.current) return;
    const scrollPosition = carouselRef.current.scrollLeft;
    const cardWidth = 452;
    const newCurrentIndex = Math.floor(
      (scrollPosition + cardWidth / 2) / cardWidth
    );
    if (currentIndex !== newCurrentIndex) {
      setCurrentIndex(newCurrentIndex);
    }
  };

  const startDragging = (e) => {
    setIsDragging(true);
    setStartX(e.type.includes("mouse") ? e.pageX : e.touches[0].pageX);
    setScrollLeft(carouselRef.current.scrollLeft);
    updateIndexFromScroll();
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    const x = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
    const walk = (x - startX) * 1;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDragging = () => {
    setIsDragging(false);
    const cardWidth = 452;
    const containerWidth = carouselRef.current.clientWidth;
    const index = Math.round(carouselRef.current.scrollLeft / cardWidth);
    const scrollLeft = index * cardWidth - (containerWidth - cardWidth) / 2;
    setCurrentIndex(index);
    carouselRef.current.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    let scrollTimeout = null;

    const handleScroll = () => {
      if (scrollTimeout !== null) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(updateIndexFromScroll, 150); // Debouncing the scroll update
    };

    carousel?.addEventListener("scroll", handleScroll);

    return () => {
      carousel?.removeEventListener("scroll", handleScroll);
      if (scrollTimeout !== null) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [currentIndex]);

  useEffect(() => {
    const handleResize = () => {
      const cardWidth = 452;
      setCurrentIndex(Math.round(carouselRef.current.scrollLeft / cardWidth));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    const cardWidth = 452;
    const containerWidth = carouselRef.current.clientWidth;
    const maxScrollLeft = carouselRef.current.scrollWidth - containerWidth;

    let scrollLeft = index * cardWidth - (containerWidth - cardWidth) / 2;

    if (scrollLeft < 0) scrollLeft = 0;
    if (scrollLeft > maxScrollLeft) scrollLeft = maxScrollLeft;

    carouselRef.current.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });
  };

  const filteredTips = data.tipsData[language]?.[section] || [];

  const dynamicImageMapping = createImageMapping(filteredTips);

  if (!filteredTips.length) return null;

  return (
    <div
      className={`${styles.container} ${
        language === "ar-ae" ? styles.rtl : ""
      }`}
      style={{
        backgroundColor: section === "business" ? "#F7F7FF" : "#9DE1D933",
        overflow: "hidden",
      }}
      data-aos="fade-up"
      suppressHydrationWarning
    >
      <Typography
        variant="caption"
        size={isMobile ? "md" : "lg"}
        style="bold"
        text={
          language == "en-us" ? "ENERGY SAVING TIPS" : "نصائح لتوفير الطاقة"
        }
        color={themeStyle["--theme-color"]}
        className={styles.header}
      />
      <div
        ref={carouselRef}
        className={styles.carousel}
        onMouseDown={startDragging}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onMouseMove={onDrag}
        onTouchStart={startDragging}
        onTouchEnd={stopDragging}
        onTouchMove={onDrag}
        style={{
          display: "flex",
          overflowX: "scroll",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        {filteredTips.map((tip, index) => (
          <div key={index} className={styles.tipCard}>
            <Image
              src={dynamicImageMapping[tip.title]}
              alt={filteredTips[currentIndex]?.alt}
              width={120}
              height={120}
            />
            <div className={styles.textContainer}>
              <Typography variant="body2" text={tip.title} color="#1A1A1D"/>
              <Typography variant={isMobile ? "body5" : "body7"} text={tip.description} color="#1A1A1D"/>
            </div>
            <LinkButton
              label={language == "en-us" ? "LEARN MORE" : "تعرف على المزيد"}
              type="primary"
              size="sm"
              onClick={(e) => handleLearnMoreClick(e, tip.link)}
              link={tip.link}
              customClass={styles.learnMore}
            />
          </div>
        ))}
      </div>
      <div className={styles.dots}>
        {filteredTips.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? styles.dotActive : styles.dot}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default TipsCarousel;
