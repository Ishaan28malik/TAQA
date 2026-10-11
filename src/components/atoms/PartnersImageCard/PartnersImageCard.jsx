import Image from "next/image";
import { Typography } from "../Typography/Typography";
import styles from "./partnersImageCard.module.css";
import { LinkButton } from "../LinkButton/LinkButton";
import { useContext } from "react";
import { OldSiteRedirectModalContext } from "@/components/organism/OldSiteRedirectModalProvider/OldSiteRedirectModalProvider";

export const PartnersImageCard = ({
  title,
  description,
  image: imgSrc,
  alt,
  links,
}) => {
  const { handleRedirect } = useContext(OldSiteRedirectModalContext);
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Typography text={title} variant="h4" className={styles.title} />
        <Typography
          text={description}
          variant="body5"
          className={styles.description}
        />
      </div>
      {imgSrc && (
        <div className={styles.imageContainer}>
          <img
            alt={alt || `Placeholder image for ${title}`}
            style={{ objectFit: "contain", width: "100%", height: "auto" }}
            src={imgSrc}
          />
        </div>
      )}

      {links?.length > 0 && (
        <div className={styles.linksContainer}>
          {links.map(({ label, link }, index) => (
            <LinkButton
              key={`image-card-link-${title}-${index}`}
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
      )}
    </div>
  );
};
