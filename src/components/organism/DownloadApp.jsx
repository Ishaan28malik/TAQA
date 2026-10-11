"use client";
import React from "react";
import DownloadButtons from "../atoms/DownloadButton/DownloadButtons";
import data from "../../constants/residential.json";
import { useIsMobile } from "../hooks/useIsMobile";
import { Typography } from "../atoms/Typography/Typography";
import { useParams } from "next/navigation";

import styles from "./downloadApp.module.css";

function DownloadApp() {
  const { region, language } = useParams();
  const { appSection } = data[region][language].overview;
  const [isMobile] = useIsMobile();

  return (
    <div
      className={styles.appsectioncontainer}
      data-aos="fade-up"
      suppressHydrationWarning
    >
      {isMobile ? (
        <>
          <div className={styles.appsection}>
            <div className={styles.tagline0}>
              <Typography
                variant="h6"
                style="bold"
                text={appSection.headline1}
              />
              <Typography
                variant="h6"
                style="bold"
                text={appSection.headline2}
              />
            </div>
            <div className={styles.content}>
              <div
                className={styles.tagline2}
                style={{
                  marginTop: "30px",
                  width: "100%",
                }}
              >
                <Typography variant="h5" text={appSection.headline3} />
              </div>
              <div style={{ marginTop: "30px" }}>
                {appSection.subHeadline.map((line, index) => (
                  <Typography
                    variant="h4"
                    text={line}
                    key={index}
                    className={styles.subHeadline}
                  />
                ))}
              </div>
              <div style={{ marginTop: "10px" }}>
                <Typography variant="body5" text={appSection.cta} />
                <div style={{ marginTop: "18px", marginBottom: "383px" }}>
                  <DownloadButtons theme={"light"} size="sm" />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.appsection}>
            <div className={styles.parentAppContent}>
              <div className={styles.appcontent}>
                <Typography variant="h5" text={appSection.headline1} />
                <Typography variant="h5" text={appSection.headline2} />
                <div className={styles.innerContent}>
                  <Typography variant="h5" text={appSection.headline3} />
                  <div className={styles.tagline}>
                    {appSection.subHeadline.map((line, index) => (
                      <Typography variant="h3" text={line} key={index} />
                    ))}
                  </div>
                </div>
                <div className={styles.midtagline}></div>
                <Typography variant="body5" text={appSection.cta} />
                <DownloadButtons theme={"light"} size="lg" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DownloadApp;
