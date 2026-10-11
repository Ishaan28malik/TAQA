"use client";
import { CommonHeaderUnit } from "@/components/organism/CommonHeaderUnit/CommonHeaderUnit";
import Footer from "@/components/organism/Footer";
import Image from "next/image";
import FooterLogo from "@/assets/images/footerLogo.png";
import FooterLogoArabic from "@/assets/images/footerLogoArabic.png";
import data from "@/constants/constantsNew.json";
import { OldSiteRedirectModalProvider } from "@/components/organism/OldSiteRedirectModalProvider/OldSiteRedirectModalProvider";
import { redirect, useParams } from "next/navigation";
import { SearchProvider } from "../SearchProvider/SearchProvider";
import { SVGIcon } from "../Icon/SVGIcon";
import socialIcons from "@/constants/socialIcons.json";

import styles from "./baseTemplate.module.css";
import { useState, useEffect } from "react";

const socialLogos = socialIcons.map((icon) => (
  <div key={icon.key} className={styles.icon}>
    <SVGIcon name={icon.name} />
  </div>
));

export const BaseTemplate = ({ children }) => {
  const { section = "", region = "", language = "" } = useParams();
  const dir = language === "ar-ae" ? "rtl" : "ltr";
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const isPartnersRoute = section.toLowerCase() === "partners";
    const regionSelected = localStorage.getItem("regionSelected");
    if (isPartnersRoute && regionSelected !== "ABU DHABI") {
      redirect(`/${region}/${language}/residential/overview`);
    } else {
      setShowPage(true);
    }
  }, [region, language, section]);

  if (!showPage) {
    return null;
  }

  return (
    <div dir={dir}>
      <OldSiteRedirectModalProvider>
        <SearchProvider>
          <div id="modalRoot"></div>
          <CommonHeaderUnit />
          {children}
          <Footer
            data={data}
            Logo={
              <Image
                src={language === "en-us" ? FooterLogo : FooterLogoArabic}
                alt="TAQA Distribution Logo"
                width={200}
                height={90}
              />
            }
            socialLogos={socialLogos}
          />
        </SearchProvider>
      </OldSiteRedirectModalProvider>
    </div>
  );
};
