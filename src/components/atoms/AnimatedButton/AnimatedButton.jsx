"use client";
import styles from "./animatedButton.module.css";
import classNames from "classnames";
import { Icon } from "../Icon/Icon";
import { useTheme } from "@/components/hooks/useTheme";
import typographyStyles from "@/components/atoms/Typography/typography.module.css";

export function AnimatedButton({
  size = "md",
  label,
  iconName,
  customClass,
  hasBorder,
}) {
  const themeStyle = useTheme();
  const typographyOnSize = {
    xl: [typographyStyles["typography--variant-cta"], typographyStyles["lg"]],
    lg: [typographyStyles["typography--variant-cta"], typographyStyles["md"]],
    md: [typographyStyles["typography--variant-cta"], typographyStyles["md"]],
    sm: [typographyStyles["typography--variant-cta"], typographyStyles["sm"]],
  };
  const buttonClasses = classNames({
    [styles.container]: true,
    [styles[size]]: true,
    [styles["icon"]]: true,
    [customClass]: !!customClass,
    [styles.bordered]: hasBorder,
    [typographyStyles.typography]: true,
    [typographyOnSize[size][0]]: true,
    [typographyOnSize[size][1]]: true,
  });

  return (
    <div className={buttonClasses}>
      {label && <span>{label}</span>}
      <Icon
        name={iconName}
        type="secondary"
        size={size}
        color={themeStyle["--theme-color"]}
        hasBorder
      />
    </div>
  );
}
