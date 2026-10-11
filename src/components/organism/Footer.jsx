"use client";
// Modules & Components
import React, { useState, useEffect } from "react";
import DownloadButtons from "../atoms/DownloadButton/DownloadButtons";
import LogoWhite from "@/assets/images/LogoWhite.png";
import RegionSelector from "../molecules/RegionSelector/RegionSelector";

// styles
import styles from "./footer.module.css";
import Image from "next/image";
import { useIsMobile } from "../hooks/useIsMobile";
import { Typography } from "../atoms/Typography/Typography";
import { useParams } from "next/navigation";

const linkStyle = (language) => ({
  color: "#1a1a1d",
  textDecoration: "none",
  borderRight: language === "en-us" && "1px solid #1a1a1d",
  borderLeft: language !== "en-us" && "1px solid #1a1a1d",
  padding: "0px 10px",
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "22.4px",
  display: "flex",
  alignItems: "center",
  margin: "0px",
  height: "14px",
});

const linkStyle2 = (language) => ({
  color: "#1a1a1d",
  textDecoration: "none",
  borderRight: language === "en-us" && "1px solid #1a1a1d",
  borderLeft: language !== "en-us" && "1px solid #1a1a1d",
  paddingRight: "10px",
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "22.4px",
  display: "flex",
  alignItems: "center",
  height: "14px",
  paddingLeft: "8px",
});

const lastLinkStyle2 = (language) => ({
  ...linkStyle2(language),
  borderRight: "none",
  borderLeft: "none",
});

const firstLinkStyle = (language) => ({
  ...linkStyle(language),
  padding: language === "en-us" ? "0px 10px 0px 0px" : "0px 10px 0px 10px",
});

const Footer = ({ data, Logo, socialLogos }) => {
  const { region, language } = useParams();
  const [isMobile] = useIsMobile();

  const footerText = data.footer.text[language];
  const links = [
    {
      href: `/${region}/${language}${footerText.sitemapLink}`,
      text: footerText.sitemap,
    },
    {
      href: `/${region}/${language}${footerText.privacyPolicyLink}`,
      text: footerText.privacyPolicy,
    },
    {
      href: `/${region}/${language}${footerText.termsConditionsLink}`,
      text: footerText.terms,
    },
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [regionSelected, setRegionSelected] = useState("");

  const handleLogoClick = () => {
    window.location.href = `https://www.taqa.com/`;
  };

  const openModal = () => {
    const storedRegion = localStorage.getItem("regionSelected");
    if (!storedRegion) {
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleRedirect = (region) => {
    let redirectRegion = "";
    if (region === "ABU DHABI") {
      redirectRegion = "addc";
    } else {
      redirectRegion = "aadc";
    }
    const redirectUrl = `/${redirectRegion}/${language}${footerText.sitemapLink}`;
    window.location.href = redirectUrl;
  };

  useEffect(() => {
    const storedRegion = localStorage.getItem("regionSelected");
    if (storedRegion) {
      setRegionSelected(storedRegion);
    }
  }, []);

  return (
    <div className={styles.footer}>
      {isMobile ? (
        <>
          <div
            style={{
              backgroundColor: "#6B42D1",
              height: "17.65%",
              width: "34.31%",
            }}
          ></div>
          <div className={styles.footertop}>
            <div className={styles.footerlogo} style={{ width: "35%" }}>
              <a
                style={{ width: "auto", cursor: "pointer" }}
                onClick={handleLogoClick}
              >
                {Logo}
              </a>
            </div>
            <div style={{ width: "65.69%" }} className={styles.footerStop2}>
              <a
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  cursor: "pointer",
                }}
                onClick={() =>
                  (window.location.href = `/${region}/${language}/residential/overview`)
                }
              >
                <Image src={LogoWhite} alt="TAQA Distribution Logo" />
              </a>
            </div>
          </div>
          <div className={styles.downloadcontainer}>
            <Typography variant="body3" text={footerText.downloadText} />
            <DownloadButtons data={data} theme={"dark"} size={"lg"} />
          </div>
          <div
            className={styles.footercontent}
            style={{ height: "40%", display: "flex" }}
          >
            <div style={{ height: "100%", paddingTop: "45px" }}>
              <Typography
                variant="body3"
                text={footerText.followUs}
                style={{ color: "#1a1a1d" }}
              />
              <div className={styles.footersocial}>
                {socialLogos.map((image, index) => (
                  <div key={index} style={{ cursor: "pointer" }}>
                    {image}
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className={styles.containerStyle}>
                  {links.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      style={
                        index === 0
                          ? firstLinkStyle(language)
                          : index === links.length - 1
                          ? lastLinkStyle2(language)
                          : linkStyle2(language)
                      }
                      onClick={(e) => {
                        if (link.text === footerText.sitemap) {
                          const storedRegion =
                            localStorage.getItem("regionSelected");
                          if (!storedRegion) {
                            e.preventDefault();
                            openModal();
                          }
                        }
                      }}
                    >
                      <Typography
                        variant="cta"
                        size="textOnly"
                        text={link.text}
                        className={`${styles.linkText} ${styles.animatedLink}`}
                      />
                    </a>
                  ))}
                </div>
              </div>
              <div className={styles.footerbottom}>
                <Typography variant="body5" text={footerText.copyright} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.footertop}>
            <div
              style={{
                backgroundColor: "#6B42D1",
                height: "100%",
                width: "20.31%",
              }}
            ></div>
            <div className={styles.downloadcontainer}>
              <Typography variant="body5" text={footerText.downloadText} />
              <DownloadButtons data={data} theme={"dark"} size={"lg"} />
            </div>
          </div>
          <div className={styles.footertop}>
            <div style={{ width: "20.31%" }}>
              <a className={styles.footerlogo} onClick={handleLogoClick}>
                {Logo}
              </a>
            </div>
            <a
              style={{ height: "100%", width: "79.69%" }}
              className={styles.footerStop2}
              target="_self"
            >
              <Image
                src={LogoWhite}
                alt="TAQA Distribution Logo"
                style={{ cursor: "pointer" }}
                width={200}
                height={90}
                onClick={() =>
                  (window.location.href = `/${region}/${language}/residential/overview`)
                }
              />
            </a>
          </div>
          <div
            className={styles.footercontent}
            style={{ height: "40%", display: "flex", flexDirection: "row" }}
          >
            <div style={{ width: "20.31%", height: "100%" }}></div>
            <div
              style={{ height: "100%", width: "59.38%", paddingTop: "45px" }}
            >
              <Typography text={footerText.followUs} variant="body4" />
              <div className={styles.footersocial}>
                {socialLogos.map((image, index) => (
                  <div key={index} style={{ cursor: "pointer" }}>
                    {image}
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "100px",
                }}
              >
                <div className={styles.containerStyle}>
                  {links.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      style={
                        index === 0
                          ? firstLinkStyle(language)
                          : index === links.length - 1
                          ? lastLinkStyle2(language)
                          : linkStyle2(language)
                      }
                      onClick={(e) => {
                        if (link.text === footerText.sitemap) {
                          const storedRegion =
                            localStorage.getItem("regionSelected");
                          if (!storedRegion) {
                            e.preventDefault();
                            openModal();
                          }
                        }
                      }}
                    >
                      <Typography
                        variant="cta"
                        size="textOnly"
                        text={link.text}
                        className={`${styles.linkText} ${styles.animatedLink}`}
                      />
                    </a>
                  ))}
                </div>
                <div className={styles.footerbottom}>
                  <Typography variant="body7" text={footerText.copyright} />
                </div>
              </div>
            </div>
            <div style={{ width: "20.31%", height: "100%" }}></div>
          </div>
        </>
      )}
      <RegionSelector
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        setRegionSelected={(region) => {
          localStorage.setItem("regionSelected", region);
          closeModal();
        }}
        handleRedirect={handleRedirect}
      />
    </div>
  );
};

export default Footer;
