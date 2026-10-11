"use client";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { QuickLink } from "@/components/atoms/QuickLink/QuickLink";
import styles from "./quickLinkGroup.module.css";
import { Typography } from "@/components/atoms/Typography/Typography";
import { useLinks } from "@/components/hooks/useLinks";
import RegionSelector from "@/components/molecules/RegionSelector/RegionSelector";
import { OldSiteRedirectModalContext } from "@/components/organism/OldSiteRedirectModalProvider/OldSiteRedirectModalProvider";
import { useParams } from "next/navigation";

export const QuickLinksGroup = ({
  headerText,
  links = [],
  onLinkClick,
  menuType,
}) => {
  const { prepLink } = useLinks();
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [regionSelected, setRegionSelected] = useState(null);
  const { handleRedirect } = useContext(OldSiteRedirectModalContext);
  const { section } = useParams();

  useEffect(() => {
    const region = localStorage.getItem("regionSelected");
    if (region) {
      setRegionSelected(region);
    }
  }, []);

  const handleLinkClick = (e, link, type) => {
    if (!regionSelected) {
      e.preventDefault();
      setIsRegionModalOpen(true);
    } else if (type === "primary") {
      handleRedirect(e, link);
    }
    onLinkClick();
  };

  const getLink = useCallback(
    (menuType, link, label) =>
      menuType === "locations"
        ? link
        : prepLink(typeof link === "object" ? link[section] : link, label),
    []
  );

  return (
    <div className={styles.container}>
      <Typography text={headerText} variant="body2" type="text" />
      <div className={styles.defaultQuickLinksContainer}>
        {links.map(({ label, link, iconName, type, label_ar }, index) =>
          type !== "primary" ? (
            <QuickLink
              key={"link-" + index}
              link={getLink(menuType, link, label)}
              label={label}
              label_ar={menuType === "locations" ? label : label_ar}
              iconName={iconName}
              onClick={(e) =>
                handleLinkClick(e, getLink(menuType, link, label), type)
              }
            />
          ) : null
        )}
      </div>
      <div className={styles.primaryQuickLinksContainer}>
        {links
          .filter(({ type }) => type === "primary")
          .map(
            (
              {
                label,
                link,
                iconName,
                description,
                type,
                label_ar,
                description_ar,
              },
              index
            ) => (
              <QuickLink
                key={"link-" + index}
                link={getLink(menuType, link, label)}
                label={label}
                label_ar={menuType === "locations" ? label : label_ar}
                type={type}
                description={description}
                description_ar={
                  menuType === "locations" ? description : description_ar
                }
                iconName={iconName}
                onClick={(e) =>
                  handleLinkClick(e, getLink(menuType, link, label), type)
                }
              />
            )
          )}
      </div>
      <RegionSelector
        isOpen={isRegionModalOpen}
        onRequestClose={() => setIsRegionModalOpen(false)}
        setRegionSelected={setRegionSelected}
        customStyles={customStyles}
      />
    </div>
  );
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "840px",
    height: "550px",
    borderBottom: "20px solid var(--Colors-Primary-Purple-100, #6B42D1)",
    margin: "0px",
    padding: "0px",
  },
};

export default QuickLinksGroup;
