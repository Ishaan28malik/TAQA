import styles from "./button.module.css";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Icon } from "../Icon/Icon";
import { useTheme } from "@/components/hooks/useTheme";

export function Button({
  type = "primary",
  size = "md",
  hasBorder,
  label,
  iconName,
  handleClick,
  disabled,
  customClass,
}) {
  const buttonClasses = classNames({
    [styles.btn]: true,
    [styles["btn-bordered"]]: hasBorder,
    [styles[`btn-${type}`]]: true,
    [styles[`btn-${size}`]]: true,
    [styles["btn-icon"]]: !!iconName,
    [styles.disabled]: !!disabled,
    [customClass]: !!customClass,
  });

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
    >
      {label && <span>{label}</span>}
      {iconName && <Icon name={iconName} type={type} size={size} />}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(["primary", "secondary", "tertiary"]).isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]).isRequired,
  hasBorder: PropTypes.bool,
  label: PropTypes.string,
  iconName: PropTypes.string,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
};
