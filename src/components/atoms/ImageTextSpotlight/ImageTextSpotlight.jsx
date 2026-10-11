"use client";
import { useTheme } from "@/components/hooks/useTheme";
import { Typography } from "../Typography/Typography";
import styles from "./imageTextSpotlight.module.css";
import { LinkButton } from "../LinkButton/LinkButton";
import { useIsMobile } from "@/components/hooks/useIsMobile";

export const ImageTextSpotlight = ({
  title1 = "",
  title2 = "",
  title3 = "",
  description1 = "",
  description2 = "",
  link = "",
  linkLabel = "",
  imgSrc,
  moveImageRight = false,
}) => {
  const themeStyle = useTheme();
  const [, , isWide] = useIsMobile();
  const imageSource =
    imgSrc && moveImageRight
      ? imgSrc.replace(".png", isWide ? "Wide.png" : ".png")
      : imgSrc;

  return (
    <section className={styles.container}>
      <div className={styles.detailsContainer}>
        <div className={styles.displayHeadersDesktop}>
          <Typography
            text={title1}
            variant="h1"
            color="#fff"
            dataAosAttr={{ "data-aos": "fade-up" }}
            className={styles.heading}
          />
          <Typography
            text={title2}
            variant="h1"
            color="#fff"
            dataAosAttr={{ "data-aos": "fade-up" }}
            className={styles.heading}
          />
          <Typography
            text={title3}
            variant="h1"
            color={themeStyle["--color-green"]}
            dataAosAttr={{ "data-aos": "fade-up" }}
            className={styles.heading}
          />
        </div>
        <div className={styles.displayHeadersMobile}>
          <Typography text={title1} variant="h2" color="#fff" />
          <Typography text={title2} variant="h2" color="#fff" />
          <Typography
            text={title3}
            variant="h2"
            color={themeStyle["--color-green"]}
          />
        </div>
        <div className={styles.subHeader}>
          <Typography
            text={description1}
            variant="body2"
            color="#fff"
            dataAosAttr={{ "data-aos": "fade-up" }}
          />
          <Typography
            text={description2}
            variant="body2"
            color="#fff"
            dataAosAttr={{ "data-aos": "fade-up" }}
          />
        </div>
        <LinkButton
          label={linkLabel}
          type="secondary"
          size="lg"
          iconName="forwardArrow"
          link={link}
          animated
          customClass={styles.discoverMore}
          dataAosAttr={{ "data-aos": "fade-up" }}
        />
      </div>
      {imageSource && (
        <div
          className={styles.imageContainer}
          data-aos="fade-left"
          suppressHydrationWarning
        >
          <img
            src={imageSource}
            rel="preload"
            decoding="async"
            aria-hidden
            alt="Spotlight banner image"
          />
        </div>
      )}
    </section>
  );
};
