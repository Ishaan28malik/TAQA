"use client";
import { useTheme } from "@/components/hooks/useTheme";
import { SearchResults } from "@/components/atoms/SearchResults/SearchResults";
import { PageSearchHeader } from "@/components/atoms/HeaderSearch/PageSearchHeader";

export const SearchPage = ({
  searchStatsString,
  searchTermPlaceholderInStats,
  loadMoreLabel,
}) => {
  const themeStyle = useTheme();

  return (
    <main style={themeStyle}>
      <PageSearchHeader />
      <SearchResults
        searchStatsString={searchStatsString}
        searchTermPlaceholderInStats={searchTermPlaceholderInStats}
        loadMoreLabel={loadMoreLabel}
      />
    </main>
  );
};
