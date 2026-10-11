import DownloadButtons from "../atoms/DownloadButton/DownloadButtons";
import styles from "./downloadAppHelpSupport.module.css";
import { Typography } from "../atoms/Typography/Typography";
import { useParams } from "next/navigation";
import translations from "../../constants/business.json";
import data from "@/constants/business.json";

const getTranslation = (language, key) => {
  return translations[language] ? translations[language][key] : key;
};

const DownloadAppHelpSupport = () => {
  const { region, language } = useParams();
  const lang = language === "ar-ae" ? "ar-ae" : "en-us";
  const { appSection } = data[language];

  return (
    <div
      className={styles.appSectionContainer}
      data-aos="fade-up"
      suppressHydrationWarning
    >
      <div className={styles.appsection}>
        <div className={styles.parentAppContent}>
          <div className={styles.appcontent}>
            <div className={styles.tagline}>
              <Typography
                variant="body4"
                text={getTranslation(lang, "powering")}
              />
              <Typography
                variant="body4"
                text={getTranslation(lang, "communities")}
              />
            </div>
            <div className={styles.midtagline}>
              <Typography
                variant="h6"
                text={getTranslation(lang, "enhancedApp")}
                style="bold"
              />
              <div style={{ marginTop: "40px", marginBottom: "30px" }}>
                <Typography
                  variant="h5"
                  text={getTranslation(lang, "controlTaqa")}
                />
              </div>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <Typography
                variant="body6"
                text={getTranslation(lang, "upgradeExperience")}
              />
            </div>
            <DownloadButtons theme={"light"} size="md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadAppHelpSupport;
