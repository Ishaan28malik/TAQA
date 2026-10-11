"use client";
import { Locator } from "@/components/organism/Locator/Locator";
import { TextOnlySpotLight } from "@/components/molecules/TextOnlySpotLight/TextOnlySpotLight";
import DownloadApp from "@/components/organism/DownloadApp";
import data from "@/constants/constantsNew.json";
import CustomerSupport from "@/components/organism/CustomerSupport";
import { useTheme } from "@/components/hooks/useTheme";

/**
 * Locations page template
 * @returns
 */
export const TemplateC = ({
  pageSpecificData,
  locations,
  services,
  caption,
}) => {
  const themeStyle = useTheme();
  const { header, description, contactUs } = pageSpecificData;
  return (
    <main style={themeStyle}>
      <TextOnlySpotLight
        caption={caption}
        title={header}
        description={description}
      />
      <Locator
        locations={locations}
        services={services}
        pageSpecificData={pageSpecificData}
      />
      <CustomerSupport contactUs={contactUs} hideLocation/>
      <DownloadApp data={data} />
    </main>
  );
};
