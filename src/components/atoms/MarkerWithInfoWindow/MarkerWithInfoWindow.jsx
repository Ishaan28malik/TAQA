"use client";

import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { LocationBox } from "../LocationBox/LocationBox";
import { Typography } from "../Typography/Typography";
import styles from "./markerWithInfoWindow.module.css";
import { SVGIcon } from "../Icon/SVGIcon";
import classNames from "classnames";

export const MarkerWithInfoWindow = ({
  position,
  details: { title, description, contact },
  showInfoBox,
  handleMarkerClick,
  handleMarkerOnClose,
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const classes = classNames({
    [styles.marker]: true,
    [styles.selected]: showInfoBox,
  });
  return (
    <>
      <AdvancedMarker
        position={position}
        ref={markerRef}
        onClick={handleMarkerClick}
      >
        <span className={classes} aria-label={title} role="button">
          <SVGIcon name="marker" aria-hidden/>
        </span>
      </AdvancedMarker>
      {showInfoBox && (
        <InfoWindow anchor={marker} onCloseClick={handleMarkerOnClose} className={styles.infoBox}>
          <Typography variant="body3" size="md" type="text" text={title} />
          <Typography variant="body7" type="text" text={description} />
          <Typography variant="body7" type="text" text={contact} />
        </InfoWindow>
      )}
    </>
  );
};
