// Modules & Components
import React from "react";
import Image from "next/image";

// styles
import styles from "./statItem.module.css";

const StatItem = ({ value, description, iconSrc, iconAlt, variant }) => {
  const statClass = `${styles.stat} ${styles[variant]}`;
  return (
    <div className={statClass}>
      <div>{value}</div>
      <div className={styles.statcontainer}>
        <Image src={iconSrc} width={60} height={60} alt={iconAlt} />
        <p>{description}</p>
      </div>
    </div>
  );
};

export default StatItem;
