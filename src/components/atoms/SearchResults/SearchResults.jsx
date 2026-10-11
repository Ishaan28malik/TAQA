import { useContext } from "react";
import styles from "./searchResults.module.css";
import { Typography } from "../Typography/Typography";
import { SearchContext } from "../SearchProvider/SearchProvider";
import { SearchResultElement } from "../SearchResultElement/SearchResultElement";
import { LinkButton } from "../LinkButton/LinkButton";

export const SearchResults = ({ searchStatsString, loadMoreLabel }) => {
  const {
    results,
    start,
    end,
    total,
    searchString,
    loadMore,
    loadMoreDisabled = false,
    isLoading,
    message,
  } = useContext(SearchContext);
  return (
    <section className={styles.container}>
      {!!total && (
        <Typography
          text={searchStatsString
            .replace("{{start}}", start)
            .replace("{{end}}", end)
            .replace("{{total}}", total)
            .replace("{{searchTerm}}", searchString)}
          variant="body5"
          className={styles.metaData}
        />
      )}
      {!!message && (
        <Typography
          text={message}
          variant="body5"
          className={styles.metaData}
        />
      )}
      {results.map(({ link, title, snippet }, index) => (
        <SearchResultElement
          link={link}
          title={title}
          snippet={snippet}
          key={`search-results-${index}`}
        />
      ))}
      {!loadMoreDisabled && (
        <LinkButton
          type="primary"
          label={loadMoreLabel}
          onClick={loadMore}
          disabled={isLoading || loadMoreDisabled}
          customClass={styles.loadMoreBtn}
        />
      )}
    </section>
  );
};
