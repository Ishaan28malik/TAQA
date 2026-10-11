import Image from "next/image";
import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";

// assets
import AppStoreWhite from "@/assets/images/AppStoreWhite.png";
import AppStoreBlack from "@/assets/images/AppStoreBlack.png";
import PlayStoreWhite from "@/assets/images/GooglePlayWhite.png";
import PlayStoreBlack from "@/assets/images/GooglePlayBlack.png";
import AppStoreWhiteAR from "@/assets/images/AppStoreWhiteAR.png";
import AppStoreBlackAR from "@/assets/images/AppStoreBlackAR.png";
import PlayStoreWhiteAR from "@/assets/images/PlayStoreWhiteAR.png";
import PlayStoreBlackAR from "@/assets/images/PlayStoreBlackAR.png";

// styles
import styles from "./downloadButtons.module.css";
import RegionSelector from "@/components/molecules/RegionSelector/RegionSelector";
import { useParams, useRouter } from "next/navigation";
import appLinks from "../../../constants/applinks.json";

const DownloadButtons = ({ theme, size }) => {
  const { language, region } = useParams();
  const regionLinks = appLinks[region] || {};
  const router = useRouter();

  const [appStoreImg, setAppStoreImg] = useState(() => {
    if (language !== "en-us") {
      return theme === "dark" ? AppStoreBlackAR : AppStoreWhiteAR;
    } else {
      return theme === "dark" ? AppStoreBlack : AppStoreWhite;
    }
  });

  const [playStoreImg, setPlayStoreImg] = useState(() => {
    if (language !== "en-us") {
      return theme === "dark" ? PlayStoreBlackAR : PlayStoreWhiteAR;
    } else {
      return theme === "dark" ? PlayStoreBlack : PlayStoreWhite;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [regionSelected, setRegionSelected] = useState(null);
  const [storeType, setStoreType] = useState(null);
  const [pendingLink, setPendingLink] = useState(null);
  const hiddenLinkRef = useRef(null);

  useEffect(() => {
    const savedRegion = localStorage.getItem("regionSelected");
    if (savedRegion) {
      setRegionSelected(savedRegion);
    }
  }, []);

  const toggleAppStoreImg = () => {
    const baseImg = language === "en-us" ? AppStoreWhite : AppStoreWhiteAR;
    const oppositeImg = language === "en-us" ? AppStoreBlack : AppStoreBlackAR;
    setAppStoreImg(appStoreImg === baseImg ? oppositeImg : baseImg);
  };

  const togglePlayStoreImg = () => {
    const baseImg = language === "en-us" ? PlayStoreWhite : PlayStoreWhiteAR;
    const oppositeImg =
      language === "en-us" ? PlayStoreBlack : PlayStoreBlackAR;
    setPlayStoreImg(playStoreImg === baseImg ? oppositeImg : baseImg);
  };

  const handleLinkClick = (e, link, type) => {
    e.preventDefault();
    if (!regionSelected) {
      setStoreType(type);
      setIsModalOpen(true);
      // setPendingLink(link);
    } else {
      // window.open(link, "_blank", "noopener,noreferrer");
      hiddenLinkRef.current.href = link;
      hiddenLinkRef.current.click();
    }
  };

  const handleRegionRedirect = (region, dropdownType, storeType) => {
    const newRegion = region.toLowerCase() === "abu dhabi" ? "addc" : "aadc";
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/\/[a-z]+\//, `/${newRegion}/`);

    if (storeType) {
      const regionLinks = appLinks[newRegion] || {};
      const link =
        storeType === "appStore"
          ? regionLinks.appStoreLink
          : regionLinks.playStoreLink;
      // setPendingLink(link);
      window.open(link, "_blank", "noopener,noreferrer");
    }

    if (currentPath === newPath) {
      window.location.reload();
    } else {
      router.push(newPath);
    }
  };

  const checkLocalStorageAndCloseModal = () => {
    const intervalId = setInterval(() => {
      // const storedRegion = localStorage.getItem("regionSelected");
      clearInterval(intervalId);
      setIsModalOpen(false);
    }, 50);
  };

  useEffect(() => {
    if (!isModalOpen && pendingLink && regionSelected) {
      hiddenLinkRef.current.href = pendingLink;
      hiddenLinkRef.current.click();
      // window.open(pendingLink, "_blank", "noopener,noreferrer");
      setPendingLink(null);
    }
  }, [isModalOpen, pendingLink, regionSelected]);

  const imageWidth = size === "sm" ? 132 : size === "md" ? 115 : 154;
  const imageHeight = size === "sm" ? 48 : size === "md" ? 42 : 60;

  return (
    <div className={styles.applinks}>
      <a
        href={regionLinks.appStoreLink}
        className={`${styles.applink} ${
          theme === "dark" &&
          ![AppStoreBlack, AppStoreBlackAR].includes(appStoreImg)
            ? styles.borderBlack
            : ""
        }`}
        onMouseEnter={toggleAppStoreImg}
        onMouseLeave={toggleAppStoreImg}
        onClick={(e) =>
          handleLinkClick(e, regionLinks.appStoreLink, "appStore")
        }
        style={{
          borderRadius: "10px",
          width: imageWidth,
          height: imageHeight,
          position: "relative",
          display: "block",
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={appStoreImg}
          alt="App Store"
          layout="fill"
          objectFit="contain"
        />
      </a>
      <a
        href={regionLinks.playStoreLink}
        className={`${styles.applink} ${
          theme === "dark" &&
          ![PlayStoreBlack, PlayStoreBlackAR].includes(playStoreImg)
            ? styles.borderBlack
            : ""
        }`}
        onMouseEnter={togglePlayStoreImg}
        onMouseLeave={togglePlayStoreImg}
        onClick={(e) =>
          handleLinkClick(e, regionLinks.playStoreLink, "playStore")
        }
        style={{
          borderRadius: "10px",
          width: imageWidth,
          height: imageHeight,
          position: "relative",
          display: "block",
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={playStoreImg}
          alt="Play Store"
          layout="fill"
          objectFit="contain"
        />
      </a>
      <RegionSelector
        isOpen={isModalOpen}
        onRequestClose={checkLocalStorageAndCloseModal}
        setRegionSelected={setRegionSelected}
        handleRedirect={handleRegionRedirect}
        storeType={storeType}
      />
      <a ref={hiddenLinkRef} style={{ display: "none" }} target="_blank" rel="noopener noreferrer"></a>
    </div>
  );
};

DownloadButtons.propTypes = {
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg"]).isRequired,
};

export default DownloadButtons;
