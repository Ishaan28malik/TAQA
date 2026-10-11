"use client";
import { Typography } from "../Typography/Typography";
import styles from "./announcementTile.module.css";
import { LinkButton } from "../LinkButton/LinkButton";
import { useTheme } from "@/components/hooks/useTheme";
import { useContext } from "react";
import { OldSiteRedirectModalContext } from "@/components/organism/OldSiteRedirectModalProvider/OldSiteRedirectModalProvider";

export const AnnouncementTile = ({
  title,
  description,
  link,
  linkLabel,
  imageSrc,
  date,
}) => {
  const themeStyle = useTheme();
  const { handleRedirect } = useContext(OldSiteRedirectModalContext);
  const hrefLink = link || "#";
  return (
    <li className={styles.container}>
      <img src={imageSrc} alt={title} aria-hidden/>
      <span className={styles.detailsContainer} >
        <Typography
          text={
            <>
              <span className={styles.dateDot} />
              {date}
            </>
          }
          variant="body7"
          className={styles.date}
          color={themeStyle["--color-grey-75"]}
        />
        <Typography
          text={title}
          variant="body4"
          style="bold"
          color={themeStyle["--color-font-black"]}
          className={styles.header}
          maxLines={2}
        />
        <Typography
          text={description}
          variant="body5"
          color={themeStyle["--color-grey-75"]}
          className={styles.description}
          maxLines={5}
        />
        <LinkButton
          label={linkLabel}
          iconName="forwardArrow"
          type="tertiary"
          size="md"
          link={hrefLink}
          onClick={(event) => {
            handleRedirect(event, hrefLink);
          }}
          customClass={styles.linkBtn}
          role="link"
          animated
        />
      </span>
    </li>
  );
};
