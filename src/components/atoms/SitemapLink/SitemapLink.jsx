"use client";
import Link from "next/link";
import { Typography } from "../Typography/Typography";
import styles from "./sitemapLink.module.css";
import { useCallback, useContext } from "react";
import { useLinks } from "@/components/hooks/useLinks";
import { OldSiteRedirectModalContext } from "@/components/organism/OldSiteRedirectModalProvider/OldSiteRedirectModalProvider";
import { SVGIcon } from "../Icon/SVGIcon";
import classNames from "classnames";

export const SitemapLink = ({
  title,
  link,
  type = "none",
  openInNewTab = false,
  showRedirectModal,
  isMisc
}) => {
  const { handleRedirect } = useContext(OldSiteRedirectModalContext);

  const { prepLink } = useLinks();
  const hrefLink = prepLink(link);

  const onClickLink = useCallback(
    (e) => {
      if(showRedirectModal)
      handleRedirect(e, hrefLink, openInNewTab);
    },
    [hrefLink]
  );

  const FinalText = !!link ? (
    <Link
      href={hrefLink}
      onClick={onClickLink}
      target={openInNewTab ? "_blank" : "_self"}
      className={styles.link}
      aria-label={title}
    >
      {title && <span>{title}</span>}
      {openInNewTab && <SVGIcon name="openInNewTab" aria-hidden="true" />}
    </Link>
  ) : (
    title
  );

  const typeTextAttribute = {
    heading: {
      variant: "cta",
      size: "lg",
    },
    caption: {
      variant: "h6",
      style: "bold",
    },
    none: {
      variant: "cta",
      size: "textOnly",
    },
  };

  const classes = classNames({
    [styles.linkText]: true,
    [styles.misc]: isMisc
  })
  return (
    <Typography
      text={FinalText}
      className={classes}
      {...typeTextAttribute[type]}
    />
  );
};
