import React from "react";
import DownloadAppHelpSupport from "./DownloadAppHelpSupport";
import TipsCarousel from "./TipsCarousel";

// styles
import styles from "./solutionsCarousel.module.css";

const SolutionsCarousel = ({ data }) => {
  return (
      <div className={styles.appsectioncontainer}>
        <DownloadAppHelpSupport />
        <div className={styles.tips}>
        <TipsCarousel data={data}/>
        </div>
      </div>
  );
};

export default SolutionsCarousel;
