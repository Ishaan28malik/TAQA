import React, { useState, useEffect } from "react";
import RenewableIcon from "@/assets/images/renewableIcon.png";
import ReductionIcon from "@/assets/images/reductionIcon.png";
import WaterIcon from "@/assets/images/waterIcon.png";
import { LinkButton } from "../atoms/LinkButton/LinkButton";
import styles from "./sustainableValues.module.css";
import StatItem from "../atoms/StatItem/StatItem";
import { useIsMobile } from "../hooks/useIsMobile";

const imageMap = {
  renewableIcon: RenewableIcon,
  reductionIcon: ReductionIcon,
  waterIcon: WaterIcon,
};

const SustainableValues = ({ data }) => {
  const { visionSection } = data;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile] = useIsMobile();

  useEffect(() => {
    let timer;
    if (isMobile) {
      timer = setInterval(() => {
        setCurrentSlide(
          (prevSlide) => (prevSlide + 1) % visionSection.stats.length
        );
      }, 2000); // Change slide every 2 seconds
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isMobile, visionSection.stats.length]);

  return (
    <div className={styles.visionsection}>
      <div className={styles.visioncontent}>
        <div className={styles.visiontagline}>{visionSection.headline}</div>
        <div className={styles.visionsubtitle}>{visionSection.subtitle}</div>
        <p>{visionSection.description}</p>
        {!isMobile && <LinkButton
          label="Know more"
          type="secondary"
          size="lg"
          iconName="forwardArrow"
          link={visionSection.knowMoreLink}
        /> }
      </div>
      {isMobile && <LinkButton
          label="Know more"
          type="secondary"
          size="lg"
          iconName="forwardArrow"
          link={visionSection.knowMoreLink}
        /> }
      <div className={styles.visionstats}>
        {isMobile ? (
          <ul
            className={styles.statsCarousel}
            style={{ transform: `translateX(-${currentSlide * 35}%)` }}
          >
            {visionSection.stats.map((stat, index) => (
              <li
                key={index}
                className={`${styles.statSlide} ${
                  index === currentSlide ? styles.activeSlide : ""
                }`}
              >
                <StatItem
                  value={stat.value}
                  description={stat.description}
                  iconSrc={imageMap[stat.icon]}
                  iconAlt={`${stat.description} Icon`}
                  variant="large"
                />
              </li>
            ))}
          </ul>
        ) : (
          visionSection.stats.map((stat) => (
            <StatItem
              key={stat.icon}
              value={stat.value}
              description={stat.description}
              iconSrc={imageMap[stat.icon]}
              iconAlt={`${stat.description} Icon`}
              variant="large"
            />
          ))
        )}
        {isMobile && (
          <div className={styles.statsIndicators}>
            {visionSection.stats.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === currentSlide ? styles.active : ""
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SustainableValues;
