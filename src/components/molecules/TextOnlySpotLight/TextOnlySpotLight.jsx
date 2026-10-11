"use client";
import { Typography } from "@/components/atoms/Typography/Typography";
import styles from "./textOnlySpotLight.module.css";
import classNames from "classnames";
import { useTheme } from "@/components/hooks/useTheme";

export const TextOnlySpotLight = ({ caption, title, description, titleTextVariant, descriptionTextVariant }) => {
  const themeStyle = useTheme();
  const titleOnly = !!title && !caption && !description;

  const classes = classNames({
    [styles.noBottomPadding]: titleOnly,
    [styles.container]: true,
  });
  return (
    <section className={classes} data-aos="fade-up" suppressHydrationWarning>
      {caption && <Typography text={caption} variant="caption" size="md" color={themeStyle["--theme-color"]}/>}
      <div className={styles.detailsContainer}>
        {title && <Typography text={title} type="heading" variant={titleTextVariant || "h1"} className={styles.heading}/>}
        {description && <Typography text={description} variant={descriptionTextVariant || "body3"} />}
      </div>
    </section>
  );
};
