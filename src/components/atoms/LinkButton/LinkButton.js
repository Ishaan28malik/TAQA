import Link from "next/link";
import styles from "./button.module.css";
import typographyStyles from "@/components/atoms/Typography/typography.module.css";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Icon } from "../Icon/Icon";
import { useTheme } from "@/components/hooks/useTheme";
import { AnimatedButton } from "../AnimatedButton/AnimatedButton";

export function LinkButton({
  type = "primary",
  size = "md",
  hasBorder,
  label,
  iconName,
  link,
  disabled,
  customClass,
  animated = false,
  onClick = () => {},
  openInNewTab = false,
  prefetch = false,
  dataAosAttr = {},
  ariaLabel="",
  ...rest
}) {
  const themeStyle = useTheme();

  const isTertiary = type === "tertiary";
  const typographyOnSize = {
    xl: [typographyStyles["typography--variant-cta"], typographyStyles["lg"]],
    lg: [typographyStyles["typography--variant-cta"], typographyStyles["md"]],
    md: [typographyStyles["typography--variant-cta"], typographyStyles["md"]],
    sm: [typographyStyles["typography--variant-cta"], typographyStyles["sm"]],
  };

  const buttonClasses = classNames({
    [styles.btn]: true,
    [styles["btn-bordered"]]: hasBorder,
    [styles[`btn-${type}`]]: true,
    [styles[`btn-${size}`]]: true,
    [styles["btn-icon"]]: !!iconName,
    [styles.disabled]: !!disabled,
    [customClass]: !!customClass,
    [styles.animated]: animated,
    [typographyStyles.typography]: true,
    [typographyOnSize[size][0]]: true,
    [typographyOnSize[size][1]]: true,
  });

  const isLink = !!link;
  const ButtonComponent = isLink ? Link : "button";
  const linkProps = isLink
    ? {
        target: openInNewTab ? "_blank" : "_self",
        referrerPolicy: "no-referrer",
        href: link,
        prefetch,
      }
    : {};

  return (
    <ButtonComponent
      className={buttonClasses}
      aria-disabled={disabled}
      aria-label={ariaLabel || label}
      onClick={onClick}
      {...linkProps}
      {...dataAosAttr}
      {...rest}
    >
      {label && !isTertiary && <span aria-hidden>{label}</span>}
      {iconName && (
        <Icon
          name={iconName}
          type={type}
          size={size}
          color={
            disabled
              ? themeStyle["--color-grey-25"]
              : themeStyle["--theme-color"]
          }
          aria-hidden
        />
      )}
      {label && isTertiary && <span>{label}</span>}
      {animated && !isTertiary && (
        <AnimatedButton
          iconName={iconName}
          size={size}
          label={label}
          customClass={styles.animatedButton}
          hasBorder={hasBorder}
          aria-hidden
        />
      )}
    </ButtonComponent>
  );
}

LinkButton.propTypes = {
  type: PropTypes.oneOf(["primary", "secondary", "tertiary"]).isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]).isRequired,
  hasBorder: PropTypes.bool,
  label: PropTypes.string,
  iconName: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
