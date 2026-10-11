"use client";
import { LocationBoxHeader } from "@/components/atoms/LocationBoxHeader/LocationBoxHeader";
import styles from "./locationBoxGroup.module.css";
import { LocationBox } from "@/components/atoms/LocationBox/LocationBox";
import { useEffect, useRef, useState } from "react";
import { LocationBoxInfo } from "@/components/atoms/LocationBoxInfo/LocationBoxInfo";
import { useIsMobile } from "@/components/hooks/useIsMobile";

export const LocationBoxGroup = ({
  locations,
  handleMarkerClick,
  selectedMarker,
  infoBox,
  moreButtonLabel,
  locationBoxHeader,
  selectedService,
}) => {
  const locationBoxRef = useRef(null);
  const [showDetailsFor, setShowDetailsFor] = useState(null);
  const [isMobile] = useIsMobile();
  const uniqueLocations = locations.reduce(
    (old, cur) => ({
      ...old,
      [cur.position]: {
        ...cur,
      },
    }),
    {}
  );

  useEffect(() => {
    setShowDetailsFor(null);
    if (!!locationBoxRef.current) {
      if (isMobile) {
        locationBoxRef.current.scrollLeft = "0px";
      } else {
        locationBoxRef.current.scrollTop = "0px";
      }
    }
  }, [selectedService, isMobile]);

  return (
    <div className={styles.container} id="locationInfoDesktop">
      <LocationBoxHeader
        count={locations.length}
        locationBoxHeader={locationBoxHeader}
      />
      <div className={styles.fadedEdgeContainer}>
        <div className={styles.locationsGroupContainer} ref={locationBoxRef}>
          {locations.map(({ title, address, contact, position }, index) => (
            <LocationBox
              moreButtonLabel={moreButtonLabel}
              key={`location-${index}`}
              title={title}
              position={position}
              description={address}
              contact={contact}
              isSelected={selectedMarker === position}
              onClick={() => {
                handleMarkerClick(position);
              }}
              onClickMore={() => {
                setShowDetailsFor(position);
              }}
            />
          ))}
        </div>
      </div>
      <LocationBoxInfo
        close={() => {
          setShowDetailsFor(null);
        }}
        infoBox={infoBox}
        details={uniqueLocations[showDetailsFor]}
        show={!!showDetailsFor}
      />
    </div>
  );
};
