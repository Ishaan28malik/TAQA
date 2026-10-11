import React from "react";
import styles from "./findYourTile.module.css";
import { LinkButton } from "../LinkButton/LinkButton";
import { Typography } from "../Typography/Typography";

const FindYourSolutionTile = ({
  items,
  currentIndex,
  language,
  handleLinkClick,
  setHoveredIndex,
  carouselRef,
  isMobile,
  capitalizeFirstLetter,
}) => {
  return (
    <ul
      ref={carouselRef}
      className={styles.carouseltrack}
      style={{
        transform:
          isMobile &&
          `translateX(${language === "en-us" ? -currentIndex * 75 : currentIndex * 75}%)`,
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={`${styles.carouselslide} ${index === currentIndex ? styles.currentIndex : ""}`}
          onClick={(event) => {
            event.preventDefault();
            handleLinkClick(language === "en-us" ? item.englishLink : item.arabicLink);
          }}
          role="link"
          tabIndex={0}
        >
          <li
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={styles.linkText}
          >
            <a rel="noopener noreferrer" className={styles.carouselLink}>
              <div className={styles.carouselslideItem}>
                <Typography
                  variant="body4"
                  text={capitalizeFirstLetter(language === "en-us" ? item.service : item.service_ar)}
                />
              </div>
            </a>
          </li>
          <a className={styles.carouselSlideIcon}>
            <LinkButton
              iconName="curvedForwardArrow"
              type="tertiary"
              customClass={styles.linkBtn}
              target="_blank"
              rel="noopener noreferrer"
            />
          </a>
        </div>
      ))}
    </ul>
  );
};

export default FindYourSolutionTile;
