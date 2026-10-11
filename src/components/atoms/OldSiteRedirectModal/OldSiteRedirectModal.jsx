"use client";
import { useIsMobile } from "@/components/hooks/useIsMobile";
import { SVGIcon } from "../Icon/SVGIcon";
import { LinkButton } from "../LinkButton/LinkButton";
import { Typography } from "../Typography/Typography";
import styles from "./oldSiteRedirectModal.module.css";
import ReactModal from "react-modal";
import { useEffect } from "react";
import { useTheme } from "@/components/hooks/useTheme";
import { useParams } from "next/navigation";
import RedirectModalContent from "@/constants/oldWebsiteRedirectModal.json";
import { REDIRECT_PROMPT_LS_KEY } from "@/constants/common";
import classNames from "classnames";
import typographyStyles from "@/components/atoms/Typography/typography.module.css";

const customStyles = {
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  transform: "translate(-50%, -50%)",
  border: "0px",
  margin: "0px",
  padding: "0px",
  width: "600px",
  height: "auto",
  zIndex: "3",
  overscrollBehavior: "none"
};

const customStylesMobile = {
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  transform: "translate(-50%, -50%)",
  maxHeight: "calc(100vh - 145px)",
  width: "83.3%",
  border: "0px",
  margin: "0px",
  padding: "0px",
  zIndex: "3",
  overscrollBehavior: "none"
};

export const OldSiteRedirectModal = ({
  isModalOpen,
  setIsModalOpen,
  link,
  openInNewTab = false,
}) => {
  const [isMobile] = useIsMobile();
  const themeStyle = useTheme();

  const { language = "" } = useParams();
  const modalContent = RedirectModalContent[language.toLowerCase()];
  const dir = language === "ar-ae" ? "rtl" : "ltr";

  useEffect(() => {
    ReactModal.setAppElement(document.getElementById("modalRoot"));
  }, []);

  const handleDNSAgainCheckbox = (event) => {
    if (event.target.checked) {
      localStorage.setItem(REDIRECT_PROMPT_LS_KEY, 1);
    } else {
      localStorage.removeItem(REDIRECT_PROMPT_LS_KEY);
    }
  };

  const handleClose = (event, redirect = false) => {
    event.preventDefault();
    setIsModalOpen(false);
    if (redirect) {
      setTimeout(() => {
        const windowHref = window.open(
          link,
          openInNewTab ? "_blank" : "_self",
          "noreferrer"
        );
        windowHref.opener = null;
      }, 100);
    }
  };

  const checkboxLabelClasses = classNames([
    styles.checkboxLabel,
    typographyStyles.typography,
    typographyStyles[
      isMobile ? "typography--variant-body6" : "typography--variant-body7"
    ],
  ]);

  return (
    <ReactModal
      isOpen={isModalOpen}
      overlayClassName={styles.overlay}
      style={{
        content: isMobile ? customStylesMobile : customStyles,
      }}
      shouldCloseOnOverlayClick={false}
      onRequestClose={handleClose}
      contentLabel="Redirect confirmation prompt"
    >
      <div
        className={
          isMobile ? styles.modalContainerMobile : styles.modalContainer
        }
        style={themeStyle}
        dir={dir}
      >
        <div className={styles.iconContainer} onClick={handleClose}>
          <SVGIcon name="iconX" />
        </div>
        <div className={styles.detailsContainer}>
          <Typography text={modalContent.title} variant="body2" />
          <Typography
            text={modalContent.description}
            variant={isMobile ? "body5" : "body6"}
          />
        </div>
        <div className={styles.controlsContainer}>
          <div className={styles.inputContainer}>
            <input
              type="checkbox"
              id="dnsCheckbox"
              onChange={handleDNSAgainCheckbox}
            />
            <label htmlFor="dnsCheckbox" className={checkboxLabelClasses}>
              {modalContent.checkboxLabel}
            </label>
          </div>
          <LinkButton
            type="secondary"
            size="lg"
            label={modalContent.btnLabel}
            link={link}
            iconName="forwardArrow"
            openInNewTab={openInNewTab}
            onClick={(event) => {
              handleClose(event, true);
            }}
            hasBorder
            animated
            customClass={styles.continueButton}
          />
        </div>
      </div>
    </ReactModal>
  );
};
