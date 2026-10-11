"use client";
import styles from "./helpAndSupportTile.module.css";
import { Typography } from "../Typography/Typography";
import { SVGIcon } from "../Icon/SVGIcon";
import { LinkButton } from "../LinkButton/LinkButton";
import { useIsMobile } from "@/components/hooks/useIsMobile";
import { OldSiteRedirectModalContext } from "@/components/organism/OldSiteRedirectModalProvider/OldSiteRedirectModalProvider";
import { useContext } from "react";

export const HelpAndSupportTile = ({
  iconName,
  title,
  description,
  link: { link: linkHref, label: linkLabel, icon: linkIcon },
}) => {
  const [isMobile] = useIsMobile();
  const { handleRedirect } = useContext(OldSiteRedirectModalContext);

  return (
    <li className={styles.container}>
      <span className={styles.iconContainer}>
        <SVGIcon name={iconName} />
      </span>
      <span className={styles.header}>
        <Typography variant="body2" type="text" text={title} maxLines={2} />
      </span>
      <Typography
        variant={isMobile ? "body5" : "body7"}
        type="text"
        text={description}
        maxLines={isMobile ? 4 : 3}
        className={styles.description}
      />
      <LinkButton
        type="tertiary"
        size="xl"
        label={linkLabel}
        link={linkHref}
        iconName={linkIcon}
        customClass={styles.linkBtn}
        onClick={(event) => {
          handleRedirect(event, linkHref);
        }}
        animated
      />
    </li>
  );
};
