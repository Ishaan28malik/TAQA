import Image from "next/image";
import React, { useEffect } from "react";
import Modal from "react-modal";
import crossIcon from "@/assets/images/crossIcon.png";
import styles from "./regionSelector.module.css";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useIsMobile } from "@/components/hooks/useIsMobile";
import Abudhabi from "@/assets/images/Abudhabi.png";
import Alain from "@/assets/images/Alain.png";
import { Typography } from "@/components/atoms/Typography/Typography";
import { useParams } from "next/navigation";
import {
  REDIRECT_PROMPT_LS_KEY,
  REGION_SELECTOR_LS_KEY,
  regionMapForRegionSelector,
} from "@/constants/common";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "840px",
    height: "auto",
    margin: "0px",
    padding: "0px",
    borderRight: "none",
    borderLeft: "none",
    borderRadius: "0px",
    zIndex: "3",
    borderBottom: "none",
  },
  overlay: {
    backgroundColor: "rgba(26, 26, 29, 0.8)",
    backdropFilter: "blur(5px)",
    zIndex: "2",
  },
};

const customStylesMobile = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    maxHeight: "calc(100vh - 145px)",
    padding: "0px",
    borderRight: "none",
    borderLeft: "none",
    borderRadius: "0px",
    zIndex: "3",
    overflow: "scroll",
    borderBottom: "none",
  },
  overlay: {
    backgroundColor: "rgba(26, 26, 29, 0.8)",
    backdropFilter: "blur(5px)",
    zIndex: "2",
    overflow: "scroll",
  },
};

function RegionSelector({
  isOpen,
  onRequestClose,
  setRegionSelected,
  handleRedirect,
  storeType,
}) {
  const params = useParams();
  const [isMobile] = useIsMobile();
  const { language } = useParams();
  const dir = language === "ar-ae" ? "rtl" : "ltr";

  const handleRegionSelection = (region) => {
    setRegionSelected(region);
    localStorage.setItem(REGION_SELECTOR_LS_KEY, region);
    localStorage.removeItem(REDIRECT_PROMPT_LS_KEY);
    const dropdownType = localStorage.getItem("activeDropdown") || "";
    onRequestClose();
    if (localStorage.getItem("regionSelected")) {
      setTimeout(() => {
        handleRedirect(region, dropdownType, storeType);
      }, 500);
    }
  };

  useEffect(() => {
    const storedRegion = localStorage.getItem(REGION_SELECTOR_LS_KEY);
    const paramRegion = params.region;
    const mappedStoredRegion = storedRegion
      ? regionMapForRegionSelector[storedRegion.toUpperCase()]
      : null;
    if (mappedStoredRegion !== paramRegion) {
      localStorage.removeItem(REGION_SELECTOR_LS_KEY);
    }
  }, [params.region]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={isMobile ? customStylesMobile : customStyles}
      contentLabel="Region Selector Modal"
    >
      <div className={styles.mainContainer}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "20px",
            cursor: "pointer",
          }}
          className={styles.mobileViewSelector}
          dir={dir}
        >
          <Image
            src={crossIcon}
            width={32}
            height={32}
            alt="close"
            onClick={onRequestClose}
          />
        </div>
        <div className={styles.headerContainer} dir={dir}>
          {isMobile ? (
            <span className={styles.header}>
              <Typography
                variant="body3"
                text={
                  language === "en-us"
                    ? "Please choose your region to"
                    : "يرجى اختيار منطقتك ل"
                }
              />
              <Typography
                variant="body3"
                text={
                  language === "en-us"
                    ? "personalise your experience better"
                    : "تخصيص تجربتك بشكل أفضل"
                }
              />
            </span>
          ) : (
            <span className={styles.header}>
              <Typography
                variant="body3"
                text={
                  language === "en-us"
                    ? "For the optimal customer experience,"
                    : "للحصول على تجربة العملاء الأمثل،"
                }
              />
              <Typography
                variant="body3"
                text={
                  language === "en-us"
                    ? "please choose your region below"
                    : "يرجى اختيار منطقتك أدناه"
                }
              />
            </span>
          )}
          {!isMobile && (
            <div style={{ height: "66px" }}>
              <Image
                src={crossIcon}
                width={32}
                height={32}
                alt="close"
                onClick={onRequestClose}
                style={{ cursor: "pointer", height: "32px", width: "32px" }}
              />
            </div>
          )}
        </div>
        <div className={styles.cardsDiv} dir={dir}>
          <div
            style={{
              width: isMobile ? "85%" : "100%",
              display: "flex",
              position: "relative",
              flexDirection: "column",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            className={`${styles.card} ${styles.card1}`}
            onClick={() => handleRegionSelection("ABU DHABI")}
          >
            <div className={styles.cardText} style={{ marginTop: "30px" }}>
              <Typography
                variant="h4"
                text={language === "en-us" ? "ABU DHABI" : "أبو ظبي"}
              />
              <Typography
                variant="body7"
                text={
                  language === "en-us"
                    ? "Existing ADDC customers, click here"
                    : "عملاء شركة أبوظبي للتوزيع الحاليين، انقر هنا"
                }
                className={styles.subHeader}
              />
            </div>
            <div style={{ display: "flex" }}>
              <div className={styles.arrowIcon}>
                <button
                  style={{ height: "48px" }}
                  onClick={() => handleRegionSelection("ABU DHABI")}
                >
                  <Icon name="forwardArrow" type={"primary"} size={"md"} />
                </button>
              </div>
              <div className={styles.frameImage1}>
                <Image
                  src={Abudhabi}
                  layout="fill"
                  objectFit="contain"
                  objectPosition="bottom"
                  alt="Abu Dhabi"
                />
              </div>
            </div>
          </div>
          <div
            style={{
              width: isMobile ? "85%" : "100%",
              display: "flex",
              position: "relative",
              flexDirection: "column",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            className={`${styles.card} ${styles.card2}`}
            onClick={() => handleRegionSelection("AL AIN")}
          >
            <div className={styles.cardText} style={{ marginTop: "30px" }}>
              <Typography
                variant="h4"
                text={language === "en-us" ? "AL AIN" : "العين"}
              />
              <Typography
                variant="body7"
                text={
                  language === "en-us"
                    ? "Existing AADC customers, click here"
                    : "عملاء شركة العين للتوزيع الحاليين. انقر هنا"
                }
                className={styles.subHeader}
              />
            </div>
            <div style={{ display: "flex" }}>
              <div className={styles.arrowIcon2}>
                <button
                  style={{ height: "48px" }}
                  onClick={() => handleRegionSelection("AL AIN")}
                >
                  <Icon name="forwardArrow" type={"primary"} size={"md"} />
                </button>
              </div>
              <div className={styles.frameImage2}>
                <Image
                  src={Alain}
                  layout="fill"
                  objectFit="contain"
                  objectPosition="bottom"
                  alt="Al Ain"
                />
              </div>
            </div>
          </div>
        </div>
        <Typography
          className={styles.notes}
          variant={isMobile ? "body4" : "body7"}
          text={
            isMobile
              ? language == "en-us"
                ? "Note: You can change your region at any time by clicking on the ‘Select Region’ drop down menu at the top of the screen"
                : 'ملاحظة: يمكنك تغيير منطقتك في أي وقت عن طريق النقر على القائمة المنسدلة "تحديد المنطقة" الموجودة أعلى الشاشة'
              : language == "en-us"
              ? "Note: You can change your region selection at any time by clicking on the top left corner of the page"
              : 'ملاحظة: يمكنك تغيير منطقتك في أي وقت عن طريق النقر على القائمة المنسدلة "تحديد المنطقة" الموجودة أعلى الشاشة'
          }
        />
      </div>
    </Modal>
  );
}

export default RegionSelector;
