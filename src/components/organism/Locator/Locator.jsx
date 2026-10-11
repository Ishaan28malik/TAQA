"use client";
import { MapHeader } from "@/components/molecules/MapHeader/MapHeader";
import styles from "./locator.module.css";
import { LocationBoxGroup } from "@/components/molecules/LocationBoxGroup/LocationBoxGroup";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { mapStyles } from "./mapConstants";
import { MarkerWithInfoWindow } from "@/components/atoms/MarkerWithInfoWindow/MarkerWithInfoWindow";
import { useCallback, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Typography } from "@/components/atoms/Typography/Typography";
import { SOMETHING_WENT_WRONG } from "@/constants/common";
import { useParams } from "next/navigation";
import { useIsMobile } from "@/components/hooks/useIsMobile";

export const MAPBOX_BODY_ID = "mapboxBody";
export const Locator = ({
  locations = {},
  services = [],
  pageSpecificData = {},
}) => {
  const [, isLandscape] = useIsMobile();
  const [selectedMarker, setSelectedMarker] = useState();
  const initiated = useRef(false);
  const { language = "" } = useParams();
  const {
    locationBoxHeader,
    moreButtonLabel,
    mapHeader,
    serviceSelectorPlaceholder,
    defaultCenter = { lat: 23.4241, lng: 53.8478 },
    infoBox,
  } = pageSpecificData;
  const [selectedService, setSelectedService] = useState(
    serviceSelectorPlaceholder
  );

  useEffect(() => {
    if (initiated.current) {
      document.getElementById(MAPBOX_BODY_ID).scrollIntoView();
    }
    initiated.current = true;
  }, [selectedService]);

  useEffect(() => {
    setSelectedMarker(null);
  }, [isLandscape]);

  const filteredLocations = Object.values(locations).filter(
    ({ services }) =>
      services.includes(selectedService.toLowerCase()) ||
      selectedService === serviceSelectorPlaceholder
  );

  /** Map markers event handlers */
  const handleMarkerClick = useCallback((position) => {
    setSelectedMarker(position);
  }, []);

  const handleMarkerOnClose = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  return (
    <section className={styles.container}>
      <MapHeader
        options={services.map((service) => ({
          value: service,
          label: service,
        }))}
        title={mapHeader}
        selectorPlaceholder={serviceSelectorPlaceholder}
        selectedService={selectedService}
        serviceSelector={(value) => {
          setSelectedService(value);
          setSelectedMarker(null);
        }}
      />
      <div className={styles.mapboxBody} id={MAPBOX_BODY_ID}>
        <LocationBoxGroup
          infoBox={infoBox}
          locationBoxHeader={locationBoxHeader}
          moreButtonLabel={moreButtonLabel}
          locations={filteredLocations}
          handleMarkerClick={handleMarkerClick}
          selectedMarker={selectedMarker}
          selectedService={selectedService}
        />
        <div className={styles.mapContainer}>
          <ErrorBoundary
            errorComponent={({ error = {} }) => {
              const message =
                error?.message || SOMETHING_WENT_WRONG[language.toLowerCase()];
              return (
                <Typography
                  text={message}
                  variant="body6"
                  color="red"
                  className={styles.errorMessage}
                />
              );
            }}
          >
            <APIProvider apiKey={process?.env?.googleMapsAPIKey}>
              <Map
                mapId={process?.env?.googleMapId}
                style={{ width: "100%", height: "100%" }}
                defaultCenter={defaultCenter}
                defaultZoom={8}
                gestureHandling="cooperative"
                disableDefaultUI
                styles={mapStyles}
                reuseMaps
                zoomControl
                scrollwheel={false}
              >
                {filteredLocations.map(
                  ({ title, address, contact, position }, index) => {
                    const positionSplit = position.split(",");
                    const latLang = {
                      lat: Number(positionSplit[0].trim()),
                      lng: Number(positionSplit[1].trim()),
                    };
                    return (
                      <MarkerWithInfoWindow
                        key={`${position}-${index}`}
                        position={latLang}
                        showInfoBox={selectedMarker === position}
                        handleMarkerClick={() => {
                          handleMarkerClick(position);
                        }}
                        handleMarkerOnClose={handleMarkerOnClose}
                        details={{
                          title,
                          description: address,
                          contact,
                        }}
                      />
                    );
                  }
                )}
              </Map>
            </APIProvider>
          </ErrorBoundary>
        </div>
      </div>
    </section>
  );
};
