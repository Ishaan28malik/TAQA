import { TemplateD as SitesmapTemplate } from "@/components/template/TemplateD/TemplateD";
import { TemplateE as PrivacyTermsTemplate } from "@/components/template/TemplateE/TemplateE";
import SiteMapData from "@/constants/sitemap.json";
import searchData from "@/constants/search.json";
import { redirect } from "next/navigation";
import { SearchPage } from "@/components/organism/SearchPage/SearchPage";
import privacyPolicyData from "@/constants/privacyPolicy.json";
import termsOfUse from "@/constants/termsOfUse.json";

export function generateStaticParams() {
  const initialRoutes = [
    {
      language: "en-us",
      region: "addc",
    },
    {
      language: "ar-ae",
      region: "addc",
    },
    {
      language: "en-us",
      region: "aadc",
    },
    {
      language: "ar-ae",
      region: "aadc",
    },
  ];

  const sections = [
    "partners",
    "business",
    "residential",
    "terms-of-use",
    "privacy-policy",
    "sitemap",
    "search",
  ];

  return sections
    .reduce((curr, section) => {
      return [
        ...curr,
        ...initialRoutes.map((initialRoute) => ({
          section:
            section === "partners" && initialRoute.region === "aadc"
              ? undefined
              : section, // aadc don't have partners
          ...initialRoute,
        })),
      ];
    }, [])
    .filter(({ section }) => !!section);
}

export default function SectionsPage({ params = {} }) {
  const { section = "", region = "", language = "" } = params;

  const { searchStatsString, searchTermPlaceholderInStats, loadMoreLabel } =
    searchData[region.toLowerCase()][language.toLowerCase()].page;
  switch (section?.toLowerCase?.()) {
    case "privacy-policy":
      return (
        <PrivacyTermsTemplate
          data={privacyPolicyData[language.toLowerCase()]}
        />
      );
    case "terms-of-use":
      return <PrivacyTermsTemplate data={termsOfUse[language.toLowerCase()]} />;
    case "sitemap":
      return (
        <SitesmapTemplate
          data={SiteMapData[region.toLowerCase()][language.toLowerCase()]}
        />
      );
    case "search":
      return (
        <SearchPage
          searchStatsString={searchStatsString}
          searchTermPlaceholderInStats={searchTermPlaceholderInStats}
          loadMoreLabel={loadMoreLabel}
        />
      );
  }

  redirect("/index.html");
}
