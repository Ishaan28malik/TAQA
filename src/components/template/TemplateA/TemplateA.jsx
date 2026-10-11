"use client";
// Modules & Components
import React from "react";
import FeaturesCarousel from "../../organism/FeaturesCarousel";
import DownloadApp from "../../organism/DownloadApp";
import Image from "next/image";
import { useTheme } from "@/components/hooks/useTheme";
import { useParams } from "next/navigation";
import { ImageTextSpotlight } from "@/components/atoms/ImageTextSpotlight/ImageTextSpotlight";
import overViewData from "@/constants/residential.json";
import { Typography } from "@/components/atoms/Typography/Typography";
import { AnnouncementCarousel } from "@/components/molecules/AnnouncementCarousel/AnnouncementCarousel";

// assets
import data from "@/constants/constantsNew.json";
import Rectangle1 from "@/assets/images/Rectangle1.png";
import Rectangle2 from "@/assets/images/Rectangle2.png";
import Rectangle3 from "@/assets/images/Rectangle3.png";
import Rectangle1Business from "@/assets/images/Rectangle1Business.png";
import Rectangle2Business from "@/assets/images/Rectangle2Business.png";
import Rectangle3Business from "@/assets/images/Rectangle3Business.png";
import Energy from "@/assets/images/Energy.png";
import Bill from "@/assets/images/Bill.png";
import CustomerSupport from "@/assets/images/CustomerSupport.png";

// styling
import styles from "./templateA.module.css";
import { useIsMobile } from "@/components/hooks/useIsMobile";

const featureCarousel = [
  {
    text1: "UNINTERRUPTED ENERGY",
    text2: "TO FUEL YOUR NEEDS",
    text_ar1:"الطاقة المستدامة",
    text_ar2:"لتلبية احتياجاتك",
    image: Energy,
  },
  {
    text1: "UNMATCHED RELIABILITY,",
    text2: "UNLIMITED POTENTIAL",
    text_ar1: "موثوقية غير مسبوقة",
    text_ar2: "إمكانات لا حدود لها",
    image: Bill,
  },
  {
    text1: "UNPARALLELED ",
    text2: "CUSTOMER SUPPORT",
    text_ar1: "استثنائي",
    text_ar2:"خدمة الزبائن",
    image: CustomerSupport,
  },
];

const TemplateA = ({ announcements }) => {
  const themeStyle = useTheme();
  const { language = "", section = "", region = "" } = useParams();
  const imagesResidential = [Rectangle1, Rectangle2, Rectangle3];
  const isMobile = useIsMobile();
  // const backgroundStyle = {
  //   defaultBackground: `linear-gradient(157.69deg,rgba(154, 208, 113, 0.8) 10.39%,rgba(10, 178, 161, 0.8) 94.5%)`,
  //   businessBackground: `#6B42D180`,
  // };
  const imagesBusiness = [
    Rectangle1Business,
    Rectangle2Business,
    Rectangle3Business,
  ];
  const {
    line1: title1,
    line2: title2,
    line3: title3,
    subtitle1: description1,
    subtitle2Residential: description2,
    subtitle2Business: description3,
    discoverMoreLink,
    discoverMoreButton,
  } = overViewData?.[region.toLowerCase()]?.[language.toLowerCase()]?.overview
    ?.heroSection || {};

  const featureCarouselImage = featureCarousel.map((feature, index) => (
    <div key={`Rectangle${index + 1}`} className={styles.responsivecontainer}>
      <Image
        src={
          section === "business"
            ? imagesBusiness[index].src
            : imagesResidential[index].src
        }
        layout="responsive"
        width={0}
        height={0}
        alt="Feature Icon"
        style={{
          display: "block",
        }}
      />
      <div className={styles.textcontainer}>
        <Typography
          text={language === "en-us" ? feature.text1 : feature.text_ar1}
          // variant="h6"
          // style={{fontSize: isMobile ? '28px' : '28px'}}
          className={styles.textChange}
        />
        <Typography
          text={language === "en-us" ? feature.text2 : feature.text_ar2}
          // variant="h6"
          // style={{fontSize: isMobile ? '28px' : '28px'}}
          className={styles.textChange}
        />
      </div>
    </div>
  ));

  return (
    <main className={styles.body} style={themeStyle}>
      {/* <!-- Spotlight --> */}
      <ImageTextSpotlight
        title1={title1}
        title2={title2}
        title3={title3}
        description1={description1}
        description2={section === "residential" ? description2 : description3}
        link={discoverMoreLink}
        linkLabel={discoverMoreButton}
        imgSrc={`/assets/images/${
          section.toLowerCase() === "business"
            ? "businessSpotlightBanner"
            : "residentialSpotlightBanner"
        }.png`}
        moveImageRight={section.toLowerCase() === "residential"}
      />
      {/* <!-- Feature Carousel --> */}
      <FeaturesCarousel featureCarouselImage={featureCarouselImage} />
      {/* <!-- Download APP --> */}
      {section !== "business" && <DownloadApp data={data} />}
      {/* <!-- Sustainable Values --> */}
      {/* <SustainableValues data={data} /> */}
      {/* <!-- Announcements --> */}
      {announcements && <AnnouncementCarousel data={announcements} />}
      {/* <!-- Footer --> */}
    </main>
  );
};

export default TemplateA;
