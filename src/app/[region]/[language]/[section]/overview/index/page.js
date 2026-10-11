import OverviewTemplate from "@/components/template/TemplateA/TemplateA";
import Data from "@/constants/constantsNew.json";
import { TemplateF as PartnersTemplate } from "@/components/template/TemplateF/TemplateF";
import announcementsData from "@/constants/announcements.json";
import partnersPageData from "@/constants/partners.json";

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

  const sections = ["partners", "business", "residential"];

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

export default function OverviewPage({
  params: { section = "", language = "", region = "" } = {},
}) {
  const announcementDataAll =
    announcementsData?.[region.toLowerCase()]?.[language.toLowerCase()];
  if (section === "partners") {
    const announcements = announcementDataAll?.partners;
    const { caption, title, description, content } =
      partnersPageData[region.toLowerCase()][language.toLowerCase()];
    return (
      <PartnersTemplate
        data={{
          caption,
          title,
          description,
          content,
        }}
        announcements={announcements}
      />
    );
  }
  const announcements = announcementDataAll?.[section.toLowerCase()];
  return (
    <OverviewTemplate
      data={Data}
      location={section}
      section="overview"
      language={language}
      announcements={announcements}
    />
  );
}
