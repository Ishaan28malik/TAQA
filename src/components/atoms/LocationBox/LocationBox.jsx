"use client";
import classNames from "classnames";
import { Typography } from "../Typography/Typography";
import styles from "./locationBox.module.css";
import { Button } from "../LinkButton/Button";
import { SVGIcon } from "../Icon/SVGIcon";
import typographyStyles from "../Typography/typography.module.css";
import { useIsMobile } from "@/components/hooks/useIsMobile";

export const LocationBox = ({
  title,
  description,
  contact,
  onClick,
  isSelected,
  onClickMore,
  moreButtonLabel,
}) => {
  const [isMobile] = useIsMobile();
  const classes = classNames({
    [styles.container]: true,
    [styles.selected]: isSelected,
  });

  const labelClasses = classNames([
    typographyStyles.typography,
    typographyStyles["typography--variant-cta"],
    typographyStyles.md,
    styles.moreButton,
  ]);

  const handleOnClickMore = (event) => {
    event.stopPropagation();
    onClickMore();
  };
  return (
    <div
      className={classes}
      onClick={onClick}
      role="button"
      aria-label={`go to ${title} on map`}
      tabIndex={0}
    >
      <div className={styles.detailsContainer}>
        <Typography
          variant="body3"
          size="md"
          type="text"
          style="bold"
          text={title}
          maxLines={2}
        />
        <Typography
          variant={isMobile ? "body5" : "body7"}
          type="text"
          text={description}
          maxLines={2}
        />
        <Typography
          variant={isMobile ? "body5" : "body7"}
          type="text"
          text={contact}
          maxLines={2}
        />
      </div>
      <button onClick={handleOnClickMore} className={labelClasses}>
        <span className={styles.moreIconContainer}>
          <SVGIcon name="plus" />
        </span>
        {moreButtonLabel}
      </button>
    </div>
  );
};
