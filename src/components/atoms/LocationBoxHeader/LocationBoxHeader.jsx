import { SVGIcon } from "../Icon/SVGIcon";
import { Typography } from "../Typography/Typography";
import styles from "./locationBoxHeader.module.css";

export const LocationBoxHeader = ({ count, locationBoxHeader = "" }) => (
  <div className={styles.container}>
    <span className={styles.iconContainer}>
      <SVGIcon name="mapLocation" />
    </span>
    <Typography
      variant="body2"
      type="text"
      text={locationBoxHeader.replace("{{number}}", count)}
    />
  </div>
);
