"use client";
import { useContext, useEffect, useId, useRef, useState } from "react";
import { SVGIcon } from "../Icon/SVGIcon";
import { Typography } from "../Typography/Typography";
import styles from "./headerSearch.module.css";
import { LinkButton } from "../LinkButton/LinkButton";
import { useParams, useRouter } from "next/navigation";
import typographyStyles from "../Typography/typography.module.css";
import classNames from "classnames";
import searchData from "@/constants/search.json";
import { SearchContext } from "../SearchProvider/SearchProvider";
import { useTheme } from "@/components/hooks/useTheme";
import { useIsMobile } from "@/components/hooks/useIsMobile";

export const HeaderSearch = ({ afterSearch = () => {}, isDropdownOpen }) => {
  const { push } = useRouter();
  const themeStyle = useTheme();
  const { language = "", region = "" } = useParams();
  const { setSearchQuery, handleSearch } = useContext(SearchContext);
  const [isMobile] = useIsMobile();

  const [headerSearchTerm, setHeaderSearchTerm] = useState("");
  const link = `/${region}/${language}/search/index`;

  const { title, inputPlaceholder, searchButtonLabel } =
    searchData[region.toLowerCase()][language.toLowerCase()].header;

  const inputClasses = classNames([
    typographyStyles.typography,
    typographyStyles[
      isMobile ? "typography--variant-body3" : "typography--variant-body5"
    ],
  ]);
  const inputId = "searchBarHeaderInput";

  // To focus on search when dropdown open and clear previous search string
  useEffect(() => {
    if (isDropdownOpen) {
      setHeaderSearchTerm("");
      document.getElementById(inputId).focus();
    }
  }, [isDropdownOpen]);

  const containerClasses = classNames([styles.container, styles.hasBorder]);

  const onSubmit = (event) => {
    // afterSearch is added to close dropdown
    if (
      (event.type === "keydown" && event.key === "Enter") ||
      event.type === "click"
    ) {
      setSearchQuery(headerSearchTerm);
      handleSearch(headerSearchTerm);
      afterSearch();
      push(link);
    }
  };

  const handleInputChange = (ele) => {
    setHeaderSearchTerm(ele.target.value);
  };

  return (
    <div className={containerClasses}>
      <Typography
        text={title}
        variant="body2"
        color={themeStyle["--color-font-black"]}
      />
      <div className={styles.inputContainer}>
        <div
          className={styles.inputElement}
          onClick={() => {
            document.getElementById(inputId).focus();
          }}
        >
          <SVGIcon name="headerSearch" />
          <input
            value={headerSearchTerm}
            onChange={handleInputChange}
            onKeyDown={onSubmit}
            placeholder={inputPlaceholder}
            className={inputClasses}
            id={inputId}
            autoComplete="off"
          />
        </div>
        <LinkButton
          label={searchButtonLabel}
          type="secondary"
          hasBorder
          disabled={headerSearchTerm?.length === 0}
          customClass={styles.searchButton}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};
