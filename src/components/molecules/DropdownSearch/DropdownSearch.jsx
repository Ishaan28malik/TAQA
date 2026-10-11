import React from "react";
import styles from "./dropdownSearch.module.css";

const DropdownSearch = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`${styles.dropdown} ${isOpen ? styles.show : ""}`}
      onClick={onClose}
    >
      <div className={styles.dropdownContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default DropdownSearch;