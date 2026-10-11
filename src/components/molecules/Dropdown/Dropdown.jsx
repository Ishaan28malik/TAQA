import React from "react";
import styles from "./dropdown.module.css";

const Dropdown = ({ isOpen, children }) => {
  return (
    <div className={`${styles.dropdown} ${isOpen ? styles.show : ""}`}>
      <div className={styles.dropdownContent}>{children}</div>
    </div>
  );
};

export default Dropdown;
