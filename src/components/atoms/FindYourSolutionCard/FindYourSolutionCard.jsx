"use client";

import { useCallback, useContext } from "react";
import { SVGIcon } from "../Icon/SVGIcon";
import { Typography } from "../Typography/Typography";
import styles from "./findYourSolutionCard.module.css";
import { OldSiteRedirectModalContext } from "@/components/organism/OldSiteRedirectModalProvider/OldSiteRedirectModalProvider";
import { useParams } from "next/navigation";
import { useIsMobile } from "@/components/hooks/useIsMobile";

const capitalizeFirstLetter = (str = "") => {
  // Convert the entire string to lowercase
  str = str.toLowerCase();

  // Capitalize the first letter of the string
  str = str.charAt(0).toUpperCase() + str.slice(1);

  // Function to capitalize first letter after " or (
  const capitalizeAfterSymbols = (input) => {
    let result = "";
    let capitalizeNext = false;
    for (let i = 0; i < input.length; i++) {
      if (capitalizeNext) {
        result += input[i].toUpperCase();
        capitalizeNext = false;
      } else {
        result += input[i];
      }
      if (input[i] === '"' || input[i] === "(" || input[i] === "“") {
        capitalizeNext = true;
      }
    }
    return result;
  };
  return capitalizeAfterSymbols(str);
};

export const FindYourSolutionCard = ({ service, serviceUrl }) => {
  const { language = "" } = useParams();
  const { handleRedirect } = useContext(OldSiteRedirectModalContext);
  const [isMobile] = useIsMobile();
  const handleClick = useCallback(
    (event) => {
      handleRedirect(event, serviceUrl);
    },
    [language]
  );
  const title =
    language.toLowerCase() === "en-us"
      ? capitalizeFirstLetter(service)
      : service;

  return (
    <li>
      <a
        href={serviceUrl}
        rel="noreferrer"
        onClick={handleClick}
        aria-label={title}
        data-aos="fade-up"
        suppressHydrationWarning
      >
        <span className={styles.container} aria-hidden>
          <span className={styles.titleContainer}>
            <Typography
              text={title}
              variant={isMobile ? "body3" : "body4"}
              style="bold"
              maxLines={3}
              className={styles.title}
            />
          </span>
          <span className={styles.iconContainer} aria-hidden>
            <SVGIcon name="curvedForwardArrow" />
          </span>
        </span>
      </a>
    </li>
  );
};
