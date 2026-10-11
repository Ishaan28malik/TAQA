"use client";

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import data from "@/constants/constantsNew.json";
import Locationpoint from "@/assets/images/locationPointer.png";
import ArrowDown from "@/assets/icons/ArrowDown.png";
import SearchIcon from "@/assets/images/searchIcon.png";
import RegionSelector from "../molecules/RegionSelector/RegionSelector";
import { useLinks } from "../hooks/useLinks";
import { useTheme } from "../hooks/useTheme";
import { Typography } from "../atoms/Typography/Typography";
import { useParams, useRouter } from "next/navigation";
import { OldSiteRedirectModalContext } from "./OldSiteRedirectModalProvider/OldSiteRedirectModalProvider";

// styles
import styles from "./header.module.css";
import { REGION_SELECTOR_LS_KEY } from "@/constants/common";

function Header({ showSearchMenu, setShowSearchMenu }) {
  const { prepLink } = useLinks();
  const { section, language } = useParams();
  const {
    header: { links },
  } = data;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [regionSelected, setRegionSelected] = useState("");
  const [currentPath, setCurrentPath] = useState(localStorage.getItem(REGION_SELECTOR_LS_KEY));
  const { handleRedirect } = useContext(OldSiteRedirectModalContext);
  const currentLinks = links ? links[language] : {};
  const router = useRouter();
  const themeStyle = useTheme();

  const handleOutages = (event) => {
    const doNotPromptRedirect = localStorage.getItem("doNotPromptRedirect");
    if (doNotPromptRedirect) {
      window.location.href = link;
    } else {
      handleRedirect(
        event,
        language === "en-us"
          ? "https://www.addc.ae/en-us/home/Pages/PlannedOutagesAndMaintenance.aspx"
          : "https://www.addc.ae/ar-ae/home/pages/plannedoutagesandmaintenance.aspx"
      );
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const toggleSearch = () => {
    setShowSearchMenu(!showSearchMenu);
  };

  const getRegionText = () => {
    if (regionSelected === "ABU DHABI") {
      return language === "en-us" ? "ABU DHABI" : "أبو ظبي";
    }
    if (regionSelected === "AL AIN") {
      return language === "en-us" ? "AL AIN" : "العين";
    }
    return language === "en-us" ? "SELECT REGION" : "اختر المنطقة";
  };

  const handleLanguageChange = () => {
    const newLanguage = language === "en-us" ? "ar-ae" : "en-us";
    const newPath = currentPath.replace(`/${language}/`, `/${newLanguage}/`);
    // setLanguage(newLanguage);
    router.push(newPath);
  };

  const filteredLinks = Object.entries(currentLinks).filter(([key, href]) => {
    const isPartnersKey = key === "partners" || key === "الشركاء";
    return (
      (isPartnersKey &&
        localStorage.getItem("regionSelected") === "ABU DHABI") ||
      !isPartnersKey
    );
  });

  const handleRegionRedirect = (region) => {
    const newRegion = region.toLowerCase() === "abu dhabi" ? "addc" : "aadc";
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/\/[a-z]+\//, `/${newRegion}/`);
    router.push(newPath);
  };

  const sectionMapping = {
    residential: "سكني",
    partners: "الشركاء",
    business: "الأعمال",
  };

  const isLinkActive = (displayText = "") => {
    if (language === "en-us") {
      return displayText.toLowerCase() === section?.toLowerCase?.();
    } else if (language === "ar-ae") {
      const arabicSection = sectionMapping[section?.toLowerCase?.()];
      return displayText === arabicSection;
    }
  };

  useEffect(() => {
    setCurrentPath(typeof window !== "undefined" && window.location.pathname);
    const storedRegion = localStorage.getItem("regionSelected");
    if (storedRegion) {
      setRegionSelected(storedRegion);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedRegion = localStorage.getItem("regionSelected");
      if (storedRegion !== regionSelected) {
        setRegionSelected(storedRegion || "");
      } else{
        setRegionSelected('')
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [regionSelected]);

  useEffect(() => {
    if (regionSelected) {
      localStorage.setItem("regionSelected", regionSelected);
    }
  }, [regionSelected]);

  if (!currentLinks) {
    return null;
  }

  return (
    <header
      className={styles.header}
      style={{ backgroundColor: themeStyle["--theme-color"] }}
    >
      <nav className={styles.navigationbar}>
        <div
          className={styles.regionSelectTitle}
          onClick={openModal}
          role="button"
          aria-label="open location selector modal"
          tabIndex={0}
        >
          <Image
            src={Locationpoint}
            width={16}
            height={16}
            alt="location selector"
          />
          <Typography text={getRegionText()} variant="cta" size="md" />
          <Image
            src={ArrowDown}
            alt="Expand"
            width={12}
            height={12}
            className={styles.dropdownindicator}
          />
        </div>
        {regionSelected === "ABU DHABI" && (
          <Typography
            variant="cta"
            size="md"
            text={
              language == "en-us"
                ? "OUTAGES AND MAINTENANCE"
                : "انقطاع التيار الكهربائي والصيانة"
            }
            className={styles.outages}
            onClick={(event) => handleOutages(event)}
          />
        )}
        <ul className={styles.navigationlist}>
          {filteredLinks.map(([key, href]) => {
            const displayText =
              key === "language"
                ? currentLinks.language
                : key.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase();
            return (
              <li
                key={key}
                className={`${styles.navigationitem} ${
                  isLinkActive(displayText) ? styles.activeLink : ""
                }`}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: key === "language" ? "90px" : "150px",
                }}
                onClick={() =>
                  key === "language"
                    ? handleLanguageChange()
                    : (window.location.href = prepLink(href))
                }
              >
                {key === "language" ? (
                  language === "en-us" ? (
                    <span
                      onClick={handleLanguageChange}
                      className={styles.fontDiffArabic}
                      role="button"
                      aria-label="عربي"
                      tabIndex={0}
                    >
                      {"عربي"}
                    </span>
                  ) : (
                    <span
                      onClick={handleLanguageChange}
                      className={styles.fontDiffEnglish}
                      role="button"
                      tabIndex={0}
                      aria-label="English"
                    >
                      {"English"}
                    </span>
                  )
                ) : (
                  <Link href={prepLink(href)}>
                    <Typography text={displayText} variant="cta" size="md" />
                  </Link>
                )}
              </li>
            );
          })}
          <li
            className={styles.searchIcon}
            onClick={toggleSearch}
            aria-label="open search"
            tabIndex={0}
          >
            <Image src={SearchIcon} width={22} height={22} alt="search" />
          </li>
        </ul>
      </nav>
      <RegionSelector
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        setRegionSelected={setRegionSelected}
        handleRedirect={handleRegionRedirect}
      />
    </header>
  );
}

export default Header;
