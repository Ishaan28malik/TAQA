"use client";
import { SVGIcon } from "../Icon/SVGIcon";
import Dropdown from "react-dropdown";
import styles from "./serviceSelector.module.css";
import typographyStyles from "@/components/atoms/Typography/typography.module.css";
import classNames from "classnames";

export const ServiceSelector = ({
  options,
  selectedService,
  serviceSelector,
  selectorPlaceholder,
}) => {
  const placeholderClasses = classNames([
    styles.placeholder,
    typographyStyles["typography--variant-cta"],
    typographyStyles.lg,
    typographyStyles.typography,
  ]);

  const menuClasses = classNames([
    styles.menu,
    typographyStyles.typography,
    typographyStyles["typography--variant-body6"],
  ]);

  return (
    <Dropdown
      options={[
        { label: selectorPlaceholder, value: selectorPlaceholder },
        ...options,
      ]}
      className={styles.container}
      arrowClassName={styles.iconContainer}
      controlClassName={styles.selector}
      placeholderClassName={placeholderClasses}
      menuClassName={menuClasses}
      value={selectedService}
      onChange={({ value }) => {
        serviceSelector(value);
      }}
      arrowClosed={
        <span className={styles.iconContainer}>
          <SVGIcon name="downArrow" />
        </span>
      }
      arrowOpen={
        <span className={styles.iconContainer}>
          <SVGIcon name="upArrow" />
        </span>
      }
    />
  );
};
