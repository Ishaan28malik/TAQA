import { Typography } from "../Typography/Typography";
import styles from "./locationBoxInfo.module.css";
import { SVGIcon } from "../Icon/SVGIcon";
import classNames from "classnames";
import { useIsMobile } from "@/components/hooks/useIsMobile";
import { useEffect } from "react";
import { MAPBOX_BODY_ID } from "@/components/organism/Locator/Locator";

const SubHeader = ({ iconName, heading, variant, style }) => (
  <Typography
    variant={variant}
    style={style}
    text={
      <>
        {iconName && <SVGIcon name={iconName} />}
        {heading}
      </>
    }
    className={styles.subHeader}
  />
);

export const LocationBoxInfo = ({
  details: { address, title, open: timings, contact, services = [] } = {},
  close,
  show,
  infoBox = {},
}) => {
  const [isMobile] = useIsMobile();
  const classes = classNames({
    [styles.show]: show,
    [styles.container]: true,
  });
  useEffect(() => {
    if (show) {
      document.getElementById(MAPBOX_BODY_ID).scrollIntoView();
    }
  }, [show]);
  return (
    <div className={classes}>
      <span
        onClick={close}
        role="button"
        aria-label="Close location info pop-up"
        className={styles.closeBtnContainer}
      >
        <SVGIcon name="iconX" />
      </span>
      <SubHeader heading={title} variant="body1" />
      {address && (
        <div className={styles.addressContainer}>
          <div>
            <SVGIcon name="locationLine" />
          </div>
          <Typography text={address} variant={isMobile ? "body5" : "body6"} />
        </div>
      )}
      {!!services.length && (
        <div className={styles.servicesContainer}>
          <SubHeader
            heading={infoBox.servicesLabel}
            iconName={"services"}
            variant="h6"
            style="bold"
          />
          <ul>
            {services.map((service, index) => (
              <li key={`service-list-${index}`}>
                <Typography
                  text={service}
                  variant={isMobile ? "body5" : "body7"}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {timings && (
        <div className={styles.timingsContainer}>
          <SubHeader
            heading={infoBox.timingsLabel}
            iconName={"clock"}
            variant="h6"
            style="bold"
          />
          <Typography variant={isMobile ? "body5" : "body7"} text={timings} />
        </div>
      )}
      {contact && (
        <div className={styles.servicesContainer}>
          <SubHeader
            heading={infoBox.callUsLabel}
            iconName={"contact"}
            variant="h6"
            style="bold"
          />
          <Typography variant={isMobile ? "body5" : "body7"} text={contact} />
        </div>
      )}
    </div>
  );
};
