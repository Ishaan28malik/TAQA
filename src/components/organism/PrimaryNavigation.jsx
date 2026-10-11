"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "../atoms/LinkButton/Button";
import styles from "./primaryNavigation.module.css";
import Image from "next/image";
import { QuickLinksGroup } from "../molecules/QuickLinksGroup/QuickLinksGroup";
import data2 from "@/constants/constants.json";
import locationsSecondaryMenuData from "@/constants/locationsSecondaryMenu.json";
import ArrowDown from "@/assets/icons/ArrowDownBlack.png";
import ArrowUpGreen from "@/assets/icons/ArrowUpGreen.png";
import ArrowUpPurple from "@/assets/icons/ArrowUpPurple.png";
import RegionSelector from "../molecules/RegionSelector/RegionSelector";
import { useLinks } from "../hooks/useLinks";
import { useIsMobile } from "../hooks/useIsMobile";
import { useTheme } from "../hooks/useTheme";
import { useParams } from "next/navigation";
import Dropdown from "../molecules/Dropdown/Dropdown";
import { Typography } from "../atoms/Typography/Typography";
import { HeaderSearch } from "../atoms/HeaderSearch/HeaderSearch";

const PrimaryNavigation = ({
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
      } else if (storedDropdown === "locations") {
        setShowLocationsLink(true);
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
      setActiveDropdown(showQuickLinks ? "" : "help-and-support");
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
      setActiveDropdown(showLocationsLink ? "" : "locations");
    }
  };
  const toggleSearch = () => {
    setShowLocationsLink(false);
    setShowQuickLinks(false);
    setShowSearchMenu(!showSearchMenu);
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
      className={styles.container}
      ref={dropdownRef}
    >
      <RegionSelector
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        setRegionSelected={setRegionSelected}
        handleRedirect={handleRedirect}
      />
      <div className={styles.mainContainer}>
        <div className={styles.primarynavigation}>
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
          </div>
          {showSecondaryMenu ? (
            <nav
              className={`${styles.navigationlinks} ${
                isMenuOpen ? styles.showMenu : ""
              }`}
              style={{ color: theme === "dark" ? "white" : "#1a1a1d" }}
            >
              <ul
                style={{ height: "auto", display: "flex", gap: "0px" }}
                className={styles.mobileList}
              >
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
                {section !== "partners" && (
                  <li
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
                  </li>
                )}
              </ul>
              <ul className={styles.dropdownList}>
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
                          } else if (key === "locations" || key === "مواقعنا") {
                            toggleLocationQuickLinks();
                          } else if (
                            key === "help-and-support" ||
                            key === "الدعم والمساعدة"
                          ) {
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
                            <div className={styles.dropdownText}>
                              <Typography
                                onClick={() =>
                                  (window.location.href = prepLink(href))
                                }
                                variant="cta"
                                size="md"
                                text={formatLinkText(key)}
                                color={
                                  isActive
                                    ? themeStyle["--theme-color"]
                                    : "inherit"
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
                                <div className={styles.quickLinkMobile}>
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
                                <div className={styles.quickLinkMobile}>
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
                            size="md"
                            text={formatLinkText(key)}
                            color={
                              isActive ? themeStyle["--theme-color"] : "inherit"
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
                            size="md"
                            text={formatLinkText(key)}
                            color={
                              isActive ? themeStyle["--theme-color"] : "inherit"
                            }
                            aria-label={formatLinkText(key)}
                            tabIndex={0}
                          />
                        )}
                      </li>
                    );
                  })}
                {section !== "partners" && (
                  <li>
                    <Button
                      label={language == "en-us" ? "LOGIN" : "تسجيل الدخول"}
                      type="primary"
                      size="md"
                      handleClick={handleLoginClick}
                      customClass={styles.loginDesktop}
                    />
                  </li>
                )}
              </ul>
            </nav>
          ) : null}
        </div>
        <div>
          {!isMobile && (
            <Dropdown isOpen={showQuickLinks}>
              <div style={{ backgroundColor: "white", color: "#1a1a1d" }}>
                <QuickLinksGroup
                  links={value.links}
                  headerText={
                    language == "en-us"
                      ? "Select a category for support"
                      : "حدد فئة الدعم"
                  }
                  onLinkClick={() => setShowQuickLinks(false)}
                />
              </div>
            </Dropdown>
          )}
          <Dropdown isOpen={showSearchMenu} onClose={toggleSearch}>
            <HeaderSearch
              afterSearch={toggleSearch}
              isDropdownOpen={showSearchMenu}
            />
          </Dropdown>
          {!isMobile && (
            <Dropdown isOpen={showLocationsLink}>
              <div style={{ backgroundColor: "white" }}>
                <QuickLinksGroup
                  links={locationsMenuData?.links}
                  menuType="locations"
                  headerText={
                    language == "en-us"
                      ? "Meet us at these locations"
                      : "حدد فئة الدعم"
                  }
                  onLinkClick={() => setShowLocationsLink(false)}
                />
              </div>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrimaryNavigation;
