"use client";
import { HelpAndSupportTile } from "@/components/atoms/HelpAndSupportTile/HelpAndSupportTile";
import styles from "./templateF.module.css";
import { TextOnlySpotLight } from "@/components/molecules/TextOnlySpotLight/TextOnlySpotLight";
import { CustomCarousel } from "@/components/atoms/CustomCarousel/CustomCarousel";
import { AnnouncementTile } from "@/components/atoms/AnnouncementTile/AnnouncemenTile";
import { Typography } from "@/components/atoms/Typography/Typography";
import { PartnersImageCard } from "@/components/atoms/PartnersImageCard/PartnersImageCard";

import { ServiceCard } from "@/components/atoms/ServiceCard/ServiceCard";
import { useTheme } from "@/components/hooks/useTheme";
import CustomerSupport from "@/components/organism/CustomerSupport";
import { AnnouncementCarousel } from "@/components/molecules/AnnouncementCarousel/AnnouncementCarousel";
import { useParams } from "next/navigation";
/**
 * Partners page template
 * @returns
 */
const carouselComponents = {
  healthAndSafety: HelpAndSupportTile,
  announcements: AnnouncementTile,
};
export const TemplateF = ({
  announcements,
  data: {
    caption,
    title,
    description,
    content: { joinUsSection, auctionAndTendersSection, carousels },
  },
}) => {
  const themeStyle = useTheme();

  return (
    <main className={styles.container} style={themeStyle}>
      <TextOnlySpotLight
        caption={caption}
        title={title}
        description={description}
      />
      <section className={styles.joinUsContainer}>
        <Typography
          text={joinUsSection.title}
          variant="h2"
          dataAosAttr={{ "data-aos": "fade-up" }}
        />
        <div className={styles.partnersPart1Container}>
          <div
            className={styles.part1LeftContainer}
            data-aos="fade-up"
            suppressHydrationWarning
          >
            {joinUsSection.networkPartners
              .filter(({ type }) => type === "partnersImageCard")
              .map(({ title, description, links, image }, index) => (
                <PartnersImageCard
                  key={`network-partners-image-card-${index}`}
                  title={title}
                  description={description}
                  image={image}
                  links={links}
                />
              ))}
            <div className={styles.serviceCardContainer}>
              {joinUsSection.networkPartners
                .filter(({ type }) => type === "serviceCard")
                .map(
                  (
                    {
                      title,
                      description,
                      links = [],
                      buttons = [],
                      onlyLink,
                      needPlaceholderLinkDesktop,
                    },
                    index
                  ) => (
                    <ServiceCard
                      key={`network-partners-service-card-${index}`}
                      title={title}
                      description={description}
                      links={links}
                      buttons={buttons}
                      onlyLink={onlyLink}
                      needPlaceholderLinkDesktop={needPlaceholderLinkDesktop}
                    />
                  )
                )}
            </div>
          </div>
          <div
            className={styles.part1RightContainer}
            data-aos-delay="100"
            data-aos="fade-up"
            suppressHydrationWarning
          >
            {joinUsSection.suppliers
              .filter(({ type }) => type === "partnersImageCard")
              .map(({ title, description, links, image }, index) => (
                <PartnersImageCard
                  key={`suppliers-image-card-${index}`}
                  title={title}
                  description={description}
                  image={image}
                  links={links}
                />
              ))}
            <div className={styles.serviceCardContainer}>
              {joinUsSection.suppliers
                .filter(({ type }) => type === "serviceCard")
                .map(
                  (
                    {
                      title,
                      description,
                      links = [],
                      buttons = [],
                      onlyLink,
                      needPlaceholderLinkDesktop,
                    },
                    index
                  ) => (
                    <ServiceCard
                      key={`suppliers-service-card-${index}`}
                      title={title}
                      description={description}
                      links={links}
                      buttons={buttons}
                      onlyLink={onlyLink}
                      needPlaceholderLinkDesktop={needPlaceholderLinkDesktop}
                    />
                  )
                )}
            </div>
          </div>
        </div>
        <div
          className={styles.partnersPart2Container}
          data-aos="fade-up"
          suppressHydrationWarning
        >
          {auctionAndTendersSection
            .filter(({ type }) => type === "partnersImageCard")
            .map(({ title, description, links, image }, index) => (
              <PartnersImageCard
                key={`suppliers-image-card-${index}`}
                title={title}
                description={description}
                image={image}
                links={links}
              />
            ))}
        </div>
      </section>
      {carousels.map(
        ({ title, description, component, slides, backgroundColor }, index) => (
          <CustomCarousel
            key={`carouse-${title}-${index}`}
            title={title}
            description={description}
            showControls
            showCount
            component={carouselComponents[component]}
            slidesData={slides}
            backgroundColor={backgroundColor}
          />
        )
      )}
      {announcements && <AnnouncementCarousel data={announcements} />}
      <CustomerSupport />
    </main>
  );
};
