"use client";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./typography.module.css";
import { createElement } from "react";

export const Typography = ({
  size,
  text,
  className,
  color,
  style,
  onClick,
  dataAosAttr = {},
  variant = "body4",
  maxLines,
}) => {
  if (!text) {
    return null;
  }
  const isHeading = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(variant);
  const classes = classNames({
    [className]: !!className,
    [styles.typography]: true,
    [styles[`typography--variant-${variant}`]]: true,
    [styles[size]]: !!size,
    [styles[style]]: !!style,
    [styles.maxLines]: typeof maxLines === 'number',
  });

  const customStyles = {
    "--max-lines": maxLines,
  };
  if (!!color) {
    customStyles["color"] = color;
  }

  if (isHeading) {
    return createElement(
      variant,
      {
        className: classes,
        style: customStyles,
        onClick,
        ...dataAosAttr,
      },
      text
    );
  }

  return (
    <p
      className={classes}
      style={customStyles}
      onClick={onClick}
      {...dataAosAttr}
    >
      {text}
    </p>
  );
};

Typography.propTypes = {
  variant: PropTypes.oneOf([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "body1",
    "body2",
    "body3",
    "body4",
    "body5",
    "body6",
    "body7",
    "body8",
    "caption",
    "cta",
  ]).isRequired,
  size: PropTypes.oneOf(["xl", "lg", "md", "sm"]).isRequired,
  style: PropTypes.oneOf(["bold"]),
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
