import { TemplateC as LocationsTemplate } from "@/components/template/TemplateC/TemplateC";
import locationsData from "@/constants/locations.json";

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

  const locationServices = ["branches", "payment-kiosks", "partners"];

  const finalRoutes = locationServices.reduce((curr, service) => {
    return [
      ...curr,
      ...initialRoutes.map((initialRoute) => ({
        locationService:
          (service === "payment-kiosks" && initialRoute.region === "aadc") ||
          service !== "payment-kiosks"
            ? service
            : undefined, // addc don't have payment-kiosks
        ...initialRoute,
      })),
    ];
  }, []);

  return finalRoutes.filter(({ locationService }) => !!locationService);
}

export default function LocationsPage({ params = {} }) {
  const { region = "", language = "", locationService = "" } = params;
  const pageSpecificData =
    locationsData[region.toLowerCase()][language.toLowerCase()];
  const {
    locations = {},
    services = [],
    caption = "",
  } = pageSpecificData[locationService.toLowerCase()];
  
  return (
    <LocationsTemplate
      pageSpecificData={pageSpecificData}
      locations={locations}
      services={services}
      caption={caption}
    />
  );
}
