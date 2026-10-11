"use client";
import classNames from "classnames";
import { LinkButton } from "../LinkButton/LinkButton";
import { Typography } from "../Typography/Typography";
import styles from "./serviceCard.module.css";
import { useIsMobile } from "@/components/hooks/useIsMobile";
import { OldSiteRedirectModalContext } from "@/components/organism/OldSiteRedirectModalProvider/OldSiteRedirectModalProvider";
import { useContext } from "react";
import { useTheme } from "@/components/hooks/useTheme";

export const ServiceCard = ({
  title,
  description,
  buttons = [],
  links = [],
  onlyLink,
  needPlaceholderLinkDesktop,
}) => {
  const [isMobile, isLandscape] = useIsMobile();
  const { handleRedirect } = useContext(OldSiteRedirectModalContext);

  const classes = classNames({
    [styles.container]: true,
    [styles.onlyLink]: !!onlyLink,
  });
  const themeStyle = useTheme();

  return (
    <div className={classes} data-aos="fade-up" suppressHydrationWarning>
      {title && <Typography text={title} variant="h6" />}
      <div className={styles.detailsContainer}>
        {description && (
          <Typography
            text={description}
            variant={isMobile ? "body5" : "body7"}
            color={`rgb(from ${themeStyle["--color-font-black"]} r g b / 80%)`}
            maxLines={isMobile?2:undefined}
            className={styles.description}
          />
        )}
        {!!links?.length && !onlyLink && (
          <div className={styles.linksContainer}>
            {links.map(({ label, link }, index) => (
              <LinkButton
                key={`service-card-link-${title}-${index}`}
                type="tertiary"
                size="md"
                label={label}
                link={link}
                iconName={label && "forwardArrow"}
                customClass={styles.linkBtn}
                onClick={(event) => {
                  handleRedirect(event, link);
                }}
                animated
              />
            ))}
          </div>
        )}
        {/* TBR: A placeholder for fixing style, not a permanent solution */}
        {needPlaceholderLinkDesktop && (!isMobile || isLandscape) && (
          <div className={styles.linksContainer}>
            <div className={styles.linkPlaceholder}></div>
          </div>
        )}
        {!!buttons?.length && (
          <div>
            {buttons.map(({ label, link }, index) => (
              <LinkButton
                key={`service-card-button-${title}-${index}`}
                type="primary"
                size="md"
                label={label}
                link={link}
                customClass={styles.primaryLinkBtn}
                onClick={(event) => {
                  handleRedirect(event, link);
                }}
              />
            ))}
          </div>
        )}
        {onlyLink &&
          !!links.length &&
          links.map(({ link, label }, index) => (
            <LinkButton
              key={`service-card-onlyLink-${title}-${index}`}
              type="tertiary"
              size="xl"
              label={label}
              link={link}
              iconName="forwardArrow"
              customClass={styles.linkBtn}
              onClick={(event) => {
                handleRedirect(event, link);
              }}
              animated
            />
          ))}
      </div>
    </div>
  );
};
