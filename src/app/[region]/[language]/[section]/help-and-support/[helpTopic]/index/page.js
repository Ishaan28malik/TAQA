import HelpAndSupporTemplate from "@/components/template/TemplateB/TemplateB";
import helpData from "@/constants/helpAndSupport.json";

export function generateStaticParams() {
  const initialRoutes = [
    {
      language: "en-us",
      section: "residential",
      region: "addc",
    },
    {
      language: "ar-ae",
      section: "residential",
      region: "addc",
    },
    {
      language: "en-us",
      section: "residential",
      region: "aadc",
    },
    {
      language: "ar-ae",
      section: "residential",
      region: "aadc",
    },
    {
      language: "en-us",
      section: "business",
      region: "addc",
    },
    {
      language: "ar-ae",
      section: "business",
      region: "addc",
    },
    {
      language: "en-us",
      section: "business",
      region: "aadc",
    },
    {
      language: "ar-ae",
      section: "business",
      region: "aadc",
    },
  ];

  const helpAndSupportTopics = [
    "Extension-and-connection-of-electricity-services",
    "Transfer-and-removal-of-electricity-services",
    "Account-management-and-bills",
    "Customer-care",
    "Connection-of-water-services",
    "Certificates",
    "Shifting-and-removal-of-water-services",
    "Registration-of-water-tankers",
    "EV-charging-tariff",
  ];

  const finalRoutes = helpAndSupportTopics.reduce((curr, topic) => {
    return [
      ...curr,
      ...initialRoutes.map((initialRoute) => ({
        helpTopic: topic.toLocaleLowerCase(),
        ...initialRoute,
      })),
    ];
  }, []);

  return finalRoutes;
}

export default function HelpAndSupportPage({
  params: { section, language, region, helpTopic } = {},
}) {
  const topicData = helpData?.[region]?.[language]?.[section]?.find(
    (topic) => topic.topic.toLowerCase() === helpTopic
  );
  return (
    <HelpAndSupporTemplate
      topicData={topicData}
      location={section}
      section="help-and-support"
      language={language}
    />
  );
}
