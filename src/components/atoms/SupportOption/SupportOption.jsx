"use client";
import React from "react";
import { Typography } from "../Typography/Typography";
import { SVGIcon } from "../Icon/SVGIcon";
import styles from "./supportOption.module.css";
import { useIsMobile } from "@/components/hooks/useIsMobile";

const SupportOption = ({
  imgsrc,
  header,
  subheader,
  link,
  dataAosAttr = {},
}) => {
  const [isMobile] = useIsMobile();
  return (
    <a
      className={styles.supportDiv}
      href={link || "#"}
      style={{ cursor: "pointer" }}
      {...dataAosAttr}
      aria-label={header}
    >
      <div className={styles.iconContainer}>
        <SVGIcon name={imgsrc} />
      </div>
      <div className={styles.supportText}>
        <span className={styles.supportHeader}>
          <Typography variant="h6" text={header} style="bold" />
        </span>
        <p className={styles.supportSubHeader}>
          <Typography variant={isMobile ? "body5" : "body7"} text={subheader} />
        </p>
      </div>
    </a>
  );
};

export default SupportOption;
