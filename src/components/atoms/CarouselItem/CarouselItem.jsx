// Modules & Components
import React from "react";
import Image from "next/image";
import moonLight from "../../../public/assets/images/moonLight.png";
import waterTanker from "../../../public/assets/images/waterTanker.png";

// styles
import styles from "./carouselItem.module.css";

const CarouselItem = ({ item, variant }) => {
  const itemClass = `${styles.carouselitem} ${styles[variant]}`;
  const headerClass = `${styles.carouselitemHeader} ${styles[variant]}`;
  const subHeaderClass = `${styles.subHeader} ${styles[variant]}`;
  const dotClass = `${styles.dot} ${styles[variant]}`;
  const dateClass = `${styles.date} ${styles[variant]}`;
  const imageWidth = variant === "small" ? 42 : 60;
  const imageHeight = variant === "small" ? 42 : 50;
  const imageMarginLeft = variant === "small" ? '30%' : '54%';

  return (
    <div className={itemClass}>
      <span className={headerClass}>{item.header}</span>
      <span className={subHeaderClass}>{item.subHeader}</span>
      <div className={styles.announcementdate}>
        <span className={dotClass}></span>
        <span className={dateClass}>{item.date}</span>
        {/* <Image
          src={
            item.icon === "moonLight"
              ? moonLight
              : item.icon === "waterTanker"
              ? waterTanker
              : ""
          }
          alt="Eye Icon"
          width={imageWidth}
          height={imageHeight}
          style={{ marginLeft: imageMarginLeft }}
        /> */}
      </div>
    </div>
  );
};

export default CarouselItem;
