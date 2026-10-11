"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "../atoms/LinkButton/Button";
import Menu from "@/assets/images/Menu.png";
import CrossIcon from "@/assets/images/crossIcon.png";
import SearchIcon from "@/assets/images/searchIconBlack.png";
import styles from "./primaryNavigationMobile.module.css";
import Image from "next/image";
import { QuickLinksGroup } from "../molecules/QuickLinksGroup/QuickLinksGroup";
import MenuDark from "@/assets/images/MenuDark.png";
import data2 from "@/constants/constants.json";
import locationsSecondaryMenuData from "@/constants/locationsSecondaryMenu.json";
import Locationpoint from "@/assets/images/locationPointer.png";
import ArrowDown from "@/assets/icons/ArrowDownBlack.png";
import ArrowDownWhite from "@/assets/icons/ArrowDown.png";
import ArrowUpGreen from "@/assets/icons/ArrowUpGreen.png";
import ArrowUpPurple from "@/assets/icons/ArrowUpPurple.png";
import RegionSelector from "../molecules/RegionSelector/RegionSelector";
import Link from "next/link";
import { useLinks } from "../hooks/useLinks";
import { useTheme } from "../hooks/useTheme";
import { useParams } from "next/navigation";
import Dropdown from "../molecules/Dropdown/Dropdown";
import { Typography } from "../atoms/Typography/Typography";
import { HeaderSearch } from "../atoms/HeaderSearch/HeaderSearch";
import { useIsMobile } from "../hooks/useIsMobile";

const PrimaryNavigationMobile = ({
  Logo,
  data,
  theme,
  showSearchMenu,
  setShowSearchMenu,
  showSecondaryMenu,
}) => {
  const themeStyle = useTheme();
  const {
    region = "",
    language = "",
    section = "",
    helpTopic = "",
    locationService = "",
  } = useParams();
  const links2 = data.header.links[language];
  const {
    "residential/help_and_support": value,
    "residential/locations": locations,
  } = data2;
  const locationsMenuData =
    locationsSecondaryMenuData[region.toLowerCase()][language.toLowerCase()][
      section.toLowerCase()
    ] || {};
  const links =
    section === "business"
      ? data.business.overview["navigation/links"][language]
      : data.residential.overview["navigation/links"][language];
  const { prepLink } = useLinks();
  const [showQuickLinks, setShowQuickLinks] = useState(false);
  const [showLocationsLink, setShowLocationsLink] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [regionSelected, setRegionSelected] = useState("");
  const [activeDropdown, setActiveDropdown] = useState("");
  const [isOverview, setIsOverview] = useState(false);
  const [loginButtonClicked, setLoginButtonClicked] = useState(false);
  const dropdownRef = useRef(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const quickLinksRef = useRef(null);
  const locationsRef = useRef(null);
  const [isMobile] = useIsMobile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOverview(window.location.pathname.includes("overview"));
    }
  }, []);

  useEffect(() => {
    const storedRegion = localStorage.getItem("regionSelected");
    if (storedRegion) {
      setRegionSelected(storedRegion);
    }
    const storedDropdown = localStorage.getItem("activeDropdown");
    if (storedDropdown) {
      setActiveDropdown(storedDropdown);
      if (storedDropdown === "help-and-support") {
        setShowQuickLinks(true);
        toggleMenu(); 
      } else if (storedDropdown === "locations") {
        setShowLocationsLink(true);
        toggleMenu(); 
      }
    }
  }, []);

  useEffect(() => {
    if (showSearchMenu) {
      setShowLocationsLink(false);
      setShowQuickLinks(false);
    }
  }, [showSearchMenu]);

  useEffect(() => {
    if (regionSelected) {
      localStorage.setItem("regionSelected", regionSelected);
    }
  }, [regionSelected]);

  const openModal = () => {
    setModalIsOpen(true);
    setIsMenuOpen(false);
  };
  const closeModal = () => setModalIsOpen(false);

  const toggleQuickLinks = () => {
    const storedRegion = localStorage.getItem("regionSelected");
    if (!storedRegion) {
      const newActiveDropdown = showQuickLinks ? "" : "help-and-support";
      setActiveDropdown(newActiveDropdown);
      setTimeout(() => {
        localStorage.setItem("activeDropdown", newActiveDropdown);
      }, 500);
      openModal();
    } else {
      setShowSearchMenu(false);
      setShowLocationsLink(false);
      setShowQuickLinks(!showQuickLinks);
      if (!showQuickLinks) {
        setActiveDropdown("help-and-support");
        setTimeout(() => {
          quickLinksRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 0);
      } else setActiveDropdown("");
    }
  };

  const toggleLocationQuickLinks = () => {
    const storedRegion = localStorage.getItem("regionSelected");
    if (!storedRegion) {
      const newActiveDropdown = showLocationsLink ? "" : "locations";
      setActiveDropdown(newActiveDropdown);
      setTimeout(() => {
        localStorage.setItem("activeDropdown", newActiveDropdown);
      }, 500);
      openModal();
    } else {
      setShowSearchMenu(false);
      setShowQuickLinks(false);
      setShowLocationsLink(!showLocationsLink);
      if (!showLocationsLink) {
        setActiveDropdown("locations");
        setTimeout(() => {
          locationsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 0);
      } else setActiveDropdown("");
    }
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setShowSearchMenu(false);
  };

  const toggleSearch = () => {
    setShowLocationsLink(false);
    setShowQuickLinks(false);
    setIsMenuOpen(false);
    setShowSearchMenu((prev) => !prev);
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

  const formatLinkText = (key) => {
    if (language === "en-us") {
      if (key === "help-and-support") {
        return "HELP & SUPPORT";
      }
      if (key === "locations") {
        return "LOCATIONS";
      }
      return key.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase();
    } else if (language === "ar-ae") {
      if (key === "help-and-support") {
        return "الدعم والمساعدة";
      }
      if (key === "locations") {
        return "مواقعنا";
      }
      return key;
    }
  };

  const isLinkActive = (href) => {
    const pathname =
      typeof window !== "undefined" ? window.location.pathname : "";

    if (language === "en-us") {
      if (href.includes("help-and-support")) {
        return pathname.includes("help-and-support");
      }
      if (href.includes("locations")) {
        return pathname.includes("locations");
      }
      if (href.includes("overview")) {
        return isOverview;
      }
      return pathname.includes(href);
    } else if (language === "ar-ae") {
      const translatedHref = href
        .replace("overview", "نظرة عامة")
        .replace("help-and-support", "الدعم والمساعدة")
        .replace("locations", "مواقعنا");

      if (translatedHref.includes("الدعم والمساعدة")) {
        return pathname.includes("الدعم والمساعدة");
      }
      if (translatedHref.includes("مواقعنا")) {
        return pathname.includes("مواقعنا");
      }
      if (translatedHref.includes("نظرة عامة")) {
        return isOverview;
      }
      return pathname.includes(translatedHref);
    }
  };

  const handleLogoClick = () => {
    window.location.href = `/${region}/${language}/residential/overview`;
  };

  const redirectToLogin = (region) => {
    const newRegion = region.toLowerCase() === "abu dhabi" ? "addc" : "aadc";
    let loginLink;
    if (newRegion === "aadc") {
      loginLink =
        "https://eservices.aadc.ae/_layouts/15/Eservices-FBA/AADC/Login.aspx";
    } else {
      loginLink =
        section === "business"
          ? "https://www.addc.ae/en-us/business/_Layouts/15/ADDC/login.aspx"
          : "https://www.addc.ae/en-us/residential/_Layouts/15/ADDC/login.aspx";
    }
    window.location.href = loginLink;
  };

  const handleLoginClick = () => {
    const storedRegion = localStorage.getItem("regionSelected");
    setLoginButtonClicked(true);
    if (!storedRegion) {
      openModal();
    } else {
      redirectToLogin(storedRegion);
    }
  };

  const handleLanguageChange = () => {
    const newLanguage = language === "en-us" ? "ar-ae" : "en-us";
    const newPath = window.location.pathname.replace(
      `/${language}/`,
      `/${newLanguage}/`
    );
    window.location.href = newPath;
  };

  const handleRedirect = (region, dropdownType) => {
    const newRegion = region.toLowerCase() === "abu dhabi" ? "addc" : "aadc";
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/\/[a-z]+\//, `/${newRegion}/`);
    if (loginButtonClicked) {
      setLoginButtonClicked(false);
      redirectToLogin(region);
    } else {
      window.location.href = newPath;
    }
    setActiveDropdown(dropdownType);
  };

  const sectionMapping = {
    residential: "سكني",
    partners: "الشركاء",
    business: "الأعمال",
  };

  const isActiveLink = (displayText = "", section = "") => {
    if (language === "en-us") {
      return displayText.toLowerCase() === section?.toLowerCase?.();
    } else if (language === "ar-ae") {
      const arabicSection = sectionMapping[section?.toLowerCase?.()];
      return displayText === arabicSection;
    }
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowQuickLinks(false);
      setShowLocationsLink(false);
      if (localStorage.getItem("regionSelected")) {
        localStorage.removeItem("activeDropdown");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      style={{
        borderBottom:
          (section === "residential" || section === "business") &&
          !helpTopic &&
          !locationService
            ? ""
            : "1px solid #e1e0e0",
        ...themeStyle,
      }}
      ref={dropdownRef}
      className={styles.container}
    >
      <RegionSelector
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        setRegionSelected={setRegionSelected}
        handleRedirect={handleRedirect}
      />
      <div className={styles.mainContainer}>
        <div className={styles.primarynavigation} style={{ padding: "0px" }}>
          <div style={{ position: "relative" }} className={styles.logosection}>
            <div className={styles.logosection}>
              <a
                target="_self"
                onClick={() => handleLogoClick()}
                style={{ cursor: "pointer" }}
                aria-label="home page"
                tabIndex={0}
              >
                {Logo}
              </a>
              <div className={styles.controls}>
                <button
                  onClick={handleLanguageChange}
                  className={styles.languageFont}
                >
                  {language === "en-us" ? "عربي" : "English"}
                </button>
                <Image
                  className={styles.searchIcon}
                  src={SearchIcon}
                  width={22}
                  height={22}
                  alt="search"
                  onClick={toggleSearch}
                  aria-label="open search"
                  tabIndex={0}
                />
                <Image
                  src={
                    isMenuOpen ? CrossIcon : theme === "dark" ? Menu : MenuDark
                  }
                  width={32}
                  height={32}
                  className={styles.burgerMenu}
                  alt="burger menu"
                  onClick={toggleMenu}
                />
              </div>
            </div>
            <div
              style={{
                marginTop: "95px",
                overflow: "visible",
              }}
              className={`${styles.navigationlinks} ${
                isMenuOpen ? styles.showMenu : ""
              }`}
            >
              <Dropdown isOpen={isMenuOpen} onClose={toggleSearch}>
                <ul
                  style={{
                    height: "auto",
                    display: "flex",
                    gap: "0px",
                    flexDirection: "column",
                  }}
                >
                  <li
                    style={{
                      backgroundColor: themeStyle["--theme-color"],
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        color: "white",
                        cursor: "pointer",
                        gap: "4px",
                      }}
                      onClick={openModal}
                    >
                      <Image
                        src={Locationpoint}
                        width={16}
                        height={16}
                        alt="location selector"
                        style={{ margin: "0px" }}
                      />
                      <Typography
                        variant="cta"
                        size={isMobile ? "lg" : "md"}
                        text={getRegionText()}
                        className={styles.regionText}
                      />
                      <Image
                        src={ArrowDownWhite}
                        alt="Expand"
                        width={12}
                        height={12}
                        className={styles.dropdownindicator}
                        style={{ margin: "0px" }}
                      />
                    </div>
                  </li>
                  {regionSelected === "ABU DHABI" && (
                    <li
                      style={{
                        backgroundColor: themeStyle["--theme-color"],
                        color: "white",
                        justifyContent: "flex-start",
                        cursor: "pointer",
                      }}
                    >
                      <Typography
                        variant="cta"
                        size="md"
                        text={
                          language == "en-us"
                            ? "OUTAGES AND MAINTENANCE"
                            : "انقطاع التيار الكهربائي والصيانة"
                        }
                        onClick={() =>
                          (window.location.href =
                            language === "en-us"
                              ? "https://www.addc.ae/en-us/home/Pages/PlannedOutagesAndMaintenance.aspx"
                              : "https://www.addc.ae/ar-ae/home/pages/plannedoutagesandmaintenance.aspx")
                        }
                      />
                    </li>
                  )}
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      overflow: "auto",
                      backgroundColor: "#ffff",
                    }}
                  >
                    {Object.entries(links2)
                      .filter(
                        ([key]) => key !== "taqaCorporate" && key !== "language"
                      )
                      .filter(
                        ([key]) =>
                          ((key === "partners" || key === "الشركاء") &&
                            localStorage.getItem("regionSelected") ===
                              "ABU DHABI") ||
                          !(key === "partners" || key === "الشركاء")
                      )
                      .map(([key, href]) => {
                        const displayText = key
                          .replace(/([a-z])([A-Z])/g, "$1 $2")
                          .toUpperCase();
                        return (
                          <li
                            key={key}
                            className={
                              isActiveLink(displayText, section)
                                ? styles.activeLink
                                : ""
                            }
                            style={{
                              color: isActiveLink(displayText, section)
                                ? "#1a1a1d"
                                : "#ffff",
                              backgroundColor: isActiveLink(
                                displayText,
                                section
                              )
                                ? "#ffff"
                                : themeStyle["--theme-color"],
                              whiteSpace: "nowrap",
                            }}
                          >
                            <Link
                              href={prepLink(href)}
                              className={styles.textCenter}
                              aria-label={`Navigate to ${displayText}`}
          tabIndex={0}
                            >
                              {displayText}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                  {section !== "partners" && (
                    <div
                      style={{
                        borderBottom: " 1px solid #D3D3D3",
                        width: "100%",
                      }}
                    >
                      <Button
                        label={language == "en-us" ? "LOGIN" : "تسجيل الدخول"}
                        type="primary"
                        size="sm"
                        handleClick={handleLoginClick}
                        customClass={styles.loginButton}
                      />
                    </div>
                  )}
                </ul>
                {showSecondaryMenu ? (
                  <ul
                    className={styles.dropdownList}
                    style={{
                      borderBottom: `20px solid ${themeStyle["--theme-color"]}`,
                    }}
                  >
                    {Object.entries(links)
                      .filter(([key]) =>
                        section === "partners"
                          ? key === "overview" || key === "نظرة عامة"
                          : true
                      )
                      .map(([key, href]) => {
                        const isDropdown =
                          key === "help-and-support" ||
                          key === "locations" ||
                          key === "الدعم والمساعدة" ||
                          key === "مواقعنا";
                        const isActive =
                          isLinkActive(prepLink(href)) ||
                          (key === "overview" && isOverview);

                        return (
                          <li
                            key={key}
                            onClick={() => {
                              if (key === "overview" || key === "نظرة عامة") {
                                const path =
                                  section === "business"
                                    ? "business"
                                    : "residential";
                                window.location.href = `/${region}/${language}/${path}/overview`;
                              } else if (
                                key === "locations" ||
                                key === "مواقعنا"
                              ) {
                                setShowSearchMenu(false);
                                setShowQuickLinks(false);
                                toggleLocationQuickLinks();
                              } else if (
                                key === "help-and-support" ||
                                key === "الدعم والمساعدة"
                              ) {
                                setShowSearchMenu(false);
                                setShowLocationsLink(false);
                                toggleQuickLinks();
                              } else {
                                window.location.href = prepLink(href);
                              }
                            }}
                            className={`${styles.mobileLinks} ${
                              isActive ? styles.activeLink : ""
                            }`}
                            style={{
                              borderBottom: isActive
                                ? `4px solid ${themeStyle["--theme-color"]}`
                                : "",
                              cursor: "pointer",
                            }}
                            onMouseEnter={() => setHoveredLink(key)}
                            onMouseLeave={() => setHoveredLink(null)}
                            aria-label={`Navigate to ${formatLinkText(key)}`}
                            tabIndex={0}
                          >
                            {isDropdown ? (
                              <>
                                <div
                                  className={`${styles.dropdownText} ${
                                    activeDropdown === key
                                      ? styles.activeDropdown
                                      : ""
                                  }`}
                                >
                                  <Typography
                                    onClick={() =>
                                      (window.location.href = prepLink(href))
                                    }
                                    variant="cta"
                                    size={isMobile ? "lg" : "md"}
                                    text={formatLinkText(key)}
                                    color={
                                      hoveredLink === key || isActive
                                        ? themeStyle["--theme-color"]
                                        : "#1a1a1d"
                                    }
                                    aria-label={formatLinkText(key)}
                                    tabIndex={0}
                                  />
                                  <Image
                                    src={
                                      hoveredLink === key || isActive
                                        ? section === "residential"
                                          ? ArrowUpGreen
                                          : ArrowUpPurple
                                        : ArrowDown
                                    }
                                    alt={
                                      hoveredLink === key || isActive
                                        ? language === "en-us"
                                          ? "Collapse"
                                          : "انهيار"
                                        : language === "en-us"
                                        ? "Expand"
                                        : "توسيع"
                                    }
                                    width={12}
                                    height={12}
                                    className={styles.dropdownindicator}
                                    tabIndex={0}
                                  />
                                </div>
                                {(key === "help-and-support" ||
                                  key === "الدعم والمساعدة") &&
                                  showQuickLinks && (
                                    <div
                                      ref={quickLinksRef}
                                      className={styles.quickLinkMobile}
                                    >
                                      <QuickLinksGroup
                                        links={value.links}
                                        headerText={
                                          language == "en-us"
                                            ? "Select a category for support"
                                            : "حدد فئة الدعم"
                                        }
                                      />
                                    </div>
                                  )}
                                {(key === "locations" || key === "مواقعنا") &&
                                  showLocationsLink && (
                                    <div
                                      ref={locationsRef}
                                      className={styles.quickLinkMobile}
                                    >
                                      <QuickLinksGroup
                                        links={locationsMenuData?.links}
                                        menuType="locations"
                                        headerText={
                                          language == "en-us"
                                            ? "Meet us at these locations"
                                            : "حدد فئة الدعم"
                                        }
                                      />
                                    </div>
                                  )}
                              </>
                            ) : section === "partners" &&
                              (key === "overview" || key === "نظرة عامة") ? (
                              <Typography
                                variant="cta"
                                size={isMobile ? "lg" : "md"}
                                text={formatLinkText(key)}
                                color={
                                  isActive
                                    ? themeStyle["--theme-color"]
                                    : "#1a1a1d"
                                }
                                aria-label={formatLinkText(key)}
                                tabIndex={0}
                              />
                            ) : (
                              <Typography
                                onClick={() =>
                                  (window.location.href = prepLink(href))
                                }
                                variant="cta"
                                size={isMobile ? "lg" : "md"}
                                text={formatLinkText(key)}
                                color={
                                  isActive
                                    ? themeStyle["--theme-color"]
                                    : "#1a1a1d"
                                }
                                aria-label={formatLinkText(key)}
                                tabIndex={0}
                              />
                            )}
                          </li>
                        );
                      })}
                    {section !== "partners" && (
                      <Button
                        label={language == "en-us" ? "LOGIN" : "تسجيل الدخول"}
                        type="primary"
                        size="md"
                        handleClick={handleLoginClick}
                        customClass={styles.loginDesktop}
                      />
                    )}
                  </ul>
                ) : null}
              </Dropdown>
            </div>
            <div style={{ marginTop: "80px" }}>
              <Dropdown isOpen={showSearchMenu} onClose={toggleSearch}>
                <HeaderSearch
                  afterSearch={toggleSearch}
                  isDropdownOpen={showSearchMenu}
                />
              </Dropdown>
            </div>
          </div>
          {section == "sitemap" && ""}
        </div>
      </div>
    </div>
  );
};

export default PrimaryNavigationMobile;
