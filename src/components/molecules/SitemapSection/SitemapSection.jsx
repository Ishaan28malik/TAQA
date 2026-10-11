"use client";
import { LinkButton } from "@/components/atoms/LinkButton/LinkButton";
import styles from "./sitemapSection.module.css";
import { SitemapLink } from "@/components/atoms/SitemapLink/SitemapLink";
import { useLinks } from "@/components/hooks/useLinks";

export const SitemapSection = ({ content, anySectionHasMisc = false }) => {
  const { prepLink } = useLinks();
  if (!content) {
    return null;
  }

  const {
    caption,
    link,
    loginLink,
    loginLabel,
    linksGroup = [],
    miscLinksGroup = [],
  } = content;

  return (
    <div
      className={styles.container}
      data-aos="fade-up"
      suppressHydrationWarning
    >
      <div className={styles.captionContainer}>
        <SitemapLink title={caption} link={link} type="caption" />
        {!!loginLink && (
          <LinkButton
            type="primary"
            size="md"
            label={loginLabel}
            link={prepLink(loginLink)}
          />
        )}
      </div>
      {linksGroup.length > 0 && (
        <div className={styles.linksContainer}>
          {linksGroup.map(
            (
              {
                title,
                link,
                externalWebsiteLink,
                parentLink,
                sublinksGroup = [],
              },
              lInd
            ) => {
              return (
                <div
                  className={styles.linksGroupContainer}
                  key={`${title}-${lInd}`}
                >
                  <SitemapLink
                    key={`${title}-link-${lInd}`}
                    title={title}
                    link={link}
                    type="heading"
                    showRedirectModal={externalWebsiteLink}
                  />
                  {!!sublinksGroup?.length && (
                    <div className={styles.sublinksGroupContainer}>
                      {sublinksGroup.map(
                        (
                          {
                            title: sTitle,
                            link: sLink,
                            externalWebsiteLink: sLegacyWebsiteLink,
                          },
                          sInd
                        ) => (
                          <SitemapLink
                            key={`sublink-${sInd}`}
                            title={sTitle}
                            link={sLink.replace("{{parentLink}}", parentLink)}
                            showRedirectModal={sLegacyWebsiteLink}
                          />
                        )
                      )}
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      )}

      {anySectionHasMisc && (
        <div className={styles.miscLinksGroupContainer}>
          {miscLinksGroup.map(
            (
              {
                title: mTitle,
                link: mLink,
                externalWebsiteLink: mLegacyWebsiteLink,
              },
              mInd
            ) => (
              <SitemapLink
                key={`misc-link-${mInd}`}
                title={mTitle}
                link={mLink}
                isMisc
                showRedirectModal={mLegacyWebsiteLink}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};
