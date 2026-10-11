import React from "react";
import classNames from "classnames";
import styles from "./quickLink.module.css";
import { SVGIcon } from "../Icon/SVGIcon";
import { Typography } from "../Typography/Typography";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useIsMobile } from "@/components/hooks/useIsMobile";

export const QuickLink = ({
  link,
  label,
  iconName,
  type,
  description,
  onClick,
  label_ar,
  description_ar,
}) => {
  const primaryClasses = classNames({
    [styles.quickLink]: true,
    [styles[type]]: !!type,
  });

  const { region, language, section } = useParams();
  const [isMobile] = useIsMobile();

  // Get the correct link based on the section for non-primary links
  const mappedLink = typeof link === "object" ? link[section] : link;

  if (
    region.toLowerCase() === "aadc" &&
    (label === "Activate my online account" || label === "Get connected")
  ) {
    return null;
  }

  if (type === "primary") {
    return (
      <Link
        href={mappedLink}
        className={primaryClasses}
        onClick={onClick}
        rel="noreferrer"
      >
        <div className={styles.primaryButtonDesc}>
          <Typography
            text={language == "en-us" ? label : label_ar}
            variant={isMobile ? "body4" : "body6"}
            type="text"
            style="bold"
          />
          <Typography
            text={language == "en-us" ? description : description_ar}
            variant="body8"
            type="text"
          />
        </div>
        {iconName && (
          <div className={styles.icon}>
            <SVGIcon name="forwardArrow" />
          </div>
        )}
      </Link>
    );
  }

  return (
    <Link href={mappedLink} className={styles.quickLink} onClick={onClick}>
      {iconName && (
        <div className={styles.icon}>
          <SVGIcon name={iconName} />
        </div>
      )}
      <span>
        <Typography
          text={language == "en-us" ? label : label_ar}
          variant={isMobile ? "body4" : "body6"}
          type="text"
          style="bold"
        />
      </span>
    </Link>
  );
};

export default QuickLink;
