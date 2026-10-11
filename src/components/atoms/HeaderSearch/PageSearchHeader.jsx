"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { SVGIcon } from "../Icon/SVGIcon";
import { Typography } from "../Typography/Typography";
import styles from "./headerSearch.module.css";
import { LinkButton } from "../LinkButton/LinkButton";
import { useParams } from "next/navigation";
import typographyStyles from "../Typography/typography.module.css";
import classNames from "classnames";
import searchData from "@/constants/search.json";
import { SearchContext } from "../SearchProvider/SearchProvider";
import { useTheme } from "@/components/hooks/useTheme";
import { useIsMobile } from "@/components/hooks/useIsMobile";

export const PageSearchHeader = () => {
  const { language = "", region = "" } = useParams();
  const {
    searchString,
    handleSearch: onSearch,
    clearQuery,
    oldSearchTerm,
    isLoading,
  } = useContext(SearchContext);
  const themeStyle = useTheme();
  const [headerSearchTerm, setHeaderSearchTerm] = useState(searchString);
  const [isMobile] = useIsMobile();

  const { title, inputPlaceholder, searchButtonLabel } =
    searchData[region.toLowerCase()][language.toLowerCase()].header;

  const inputClasses = classNames([
    typographyStyles.typography,
    typographyStyles[
      isMobile ? "typography--variant-body3" : "typography--variant-body5"
    ],
  ]);

  const inputId = "searchBarPageInput";
  // To focus on search when dropdown open and clear previous search string
  useEffect(() => {
    document.getElementById(inputId).focus();
    return () => {
      clearQuery();
    };
  }, []);

  useEffect(() => {
    setHeaderSearchTerm(searchString);
  }, [searchString]);

  const onSubmit = (event) => {
    if (
      (event.type === "keydown" && event.key === "Enter") ||
      event.type === "click"
    ) {
      onSearch(headerSearchTerm);
    }
  };

  const handleInputChange = (ele) => {
    setHeaderSearchTerm(ele.target.value);
  };

  return (
    <div className={styles.container}>
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
            onKeyDown={(event) => {
              if (
                !(
                  headerSearchTerm?.length === 0 ||
                  oldSearchTerm === headerSearchTerm ||
                  isLoading
                )
              ) {
                onSubmit(event);
              }
            }}
            placeholder={inputPlaceholder}
            className={inputClasses}
            id={inputId}
            autoComplete="off"
          />
          {isLoading && (
            <span className={styles.loaderContainer}>
              <SVGIcon name="loader" />
            </span>
          )}
        </div>
        <LinkButton
          label={searchButtonLabel}
          type="secondary"
          hasBorder
          disabled={
            headerSearchTerm?.length === 0 ||
            oldSearchTerm === headerSearchTerm ||
            isLoading
          }
          customClass={styles.searchButton}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};
