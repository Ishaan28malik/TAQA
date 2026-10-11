"use client";
import { useSearchAPI } from "@/components/hooks/useSearchAPI";
import { useParams } from "next/navigation";
import { createContext, useCallback, useRef, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchString, setSearchString] = useState("");
  const oldSearchTerm = useRef("");

  const {
    results = [],
    isLoading = false,
    start,
    end,
    total,
    loadMoreDisabled,
    handleSearch,
    clearSearch,
    loadMore,
    message,
  } = useSearchAPI();

  const { region } = useParams();

  const setSearchQuery = useCallback((val = "") => {
    setSearchString(val.trim());
    if (val != oldSearchTerm.current) {
      clearSearch();
    }
    oldSearchTerm.current = val;
  }, []);

  const getSearchResults = useCallback(
    (searchTerm = "") => {
      setSearchQuery(searchTerm);
      return handleSearch(searchTerm.trim(), 0, region);
    },
    [region]
  );

  const clearQuery = () => {
    setSearchString("");
    oldSearchTerm.current = "";
    clearSearch();
  };

  const loadNextPage = useCallback(
   () => loadMore(searchString, region),
    [searchString, region, loadMore]
  );

  return (
    <SearchContext.Provider
      value={{
        searchString,
        setSearchQuery,
        clearQuery,
        results,
        isLoading,
        start,
        end,
        total,
        handleSearch: getSearchResults,
        oldSearchTerm: oldSearchTerm.current,
        isLoading,
        loadMoreDisabled,
        loadMore: loadNextPage,
        message,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
