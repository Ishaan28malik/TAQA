import { Typography } from "../Typography/Typography";
import styles from "./searchResultElement.module.css";

export const SearchResultElement = ({ title, snippet, link }) => {
  return (
    <div
      className={styles.container}
      onClick={() => {
        window.open(link, "_blank");
      }}
    >
      <Typography text={title} variant="body2" />
      <Typography text={snippet} variant="body7" />
    </div>
  );
};
