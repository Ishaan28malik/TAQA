import { NO_RESULTS_FOUND, SOMETHING_WENT_WRONG } from "@/constants/common";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";

const websiteToExlude = {
  addc: "aadc.ae",
  aadc: "addc.ae",
};

export const useSearchAPI = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchMeta, setSearchMeta] = useState({
    startIndex: 0,
    endIndex: 0,
    total: 0,
  });
  const [nextStartOffset, setNextStartOffset] = useState(-1);
  const [message, setMessage] = useState("");
  const { language = "", region = "" } = useParams();

  const clearData = () => {
    setResults([]);
    setIsLoading(false);
    setSearchMeta({
      startIndex: 0,
      endIndex: 0,
      total: 0,
    });
    setNextStartOffset(-1);
  };

  const handleSearch = async (searchTerm = "", start = 0) => {
    // Handle search logic here
    try {
      if (!!searchTerm.trim() || !isLoading) {
        const url = `${process?.env?.googleSearchLink}&q=${encodeURI(
          searchTerm
        )}&start=${start}&siteSearch=${
          websiteToExlude[region.toLowerCase()]
        }&siteSearchFilter=e`;
        setIsLoading(true);
        const response = await fetch(url).then((res) => res.json());
        const {
          items = [],
          searchInformation: { totalResults },
          queries: {
            request: requestInformation,
            nextPage: nextPageInformation,
          },
        } = response;
        setIsLoading(false);

        setResults((oldResults) => {
          if (oldResults.length === 0 && totalResults == 0) {
            setMessage(NO_RESULTS_FOUND[language.toLowerCase()]);
          } else {
            setMessage("");
          }
          return [...oldResults, ...items];
        });
        setNextStartOffset(nextPageInformation?.[0]?.startIndex || -1);
        setSearchMeta((oldMetaData) => ({
          startIndex:
            oldMetaData.startIndex === 0
              ? requestInformation?.[0]?.startIndex
              : oldMetaData.startIndex,
          endIndex:
            requestInformation?.[0]?.startIndex +
            requestInformation?.[0]?.count -
            1,
          total: Number(totalResults),
        }));
      }
    } catch {
      setMessage(SOMETHING_WENT_WRONG[language.toLowerCase()]);
      setIsLoading(false);
    }
  };

  const loadMore = useCallback(
    (searchTerm) => handleSearch(searchTerm, nextStartOffset),
    [nextStartOffset, region]
  );

  return {
    results,
    isLoading,
    start: searchMeta.startIndex,
    end: searchMeta.endIndex,
    total: searchMeta.total,
    handleSearch,
    clearSearch: clearData,
    loadMoreDisabled: nextStartOffset === -1,
    loadMore,
    message,
  };
};
