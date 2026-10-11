import React from "react";
import FAQSection from "./FAQs";
import WeAreHereToHelp from "../atoms/WeAreHereToHelp/WeareHereToHelp";

// styles
import styles from "./faqPanel.module.css";
import TipsCarousel from "./TipsCarousel";
import { useParams } from "next/navigation";

const FAQPanel = ({ data }) => {
  const { section } = useParams();
  return (
    <div className={styles.container}>
      <FAQSection />
      <div className={styles.layout}>
      <div className={styles.weAreHereToHelpMobile}>
        <WeAreHereToHelp data={data} />
      </div>
      <div className={styles.quickLinkPanel}>
        {section === "business" && (
          <div className={styles.tipCarousel}>
            <TipsCarousel />
          </div>
        )}
        <div className={styles.tipCarouselMobile}>
          <TipsCarousel />
        </div>
        <div className={styles.weAreHereToHelp}>
          <WeAreHereToHelp data={data} />
        </div>
      </div>
      </div>
   </div>
  );
};

export default FAQPanel;
