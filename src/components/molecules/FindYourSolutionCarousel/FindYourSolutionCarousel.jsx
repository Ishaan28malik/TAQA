"use client";
import { CustomCarousel } from "@/components/atoms/CustomCarousel/CustomCarousel";
import { FindYourSolutionCard } from "@/components/atoms/FindYourSolutionCard/FindYourSolutionCard";
import { useIsMobile } from "@/components/hooks/useIsMobile";
import { useTheme } from "@/components/hooks/useTheme";

export const FindYourSolutionCarousel = ({ data }) => {
  const themeStyle = useTheme();
  const [isMobile] = useIsMobile();

  if (!!data) {
    const {
      title = "",
      description = "",
      slides,
      backgroundColor = "#FFFFFF",
    } = data;
    return (
      <CustomCarousel
        title={title}
        description={description}
        showControls
        showCount
        component={FindYourSolutionCard}
        slidesData={slides}
        backgroundColor={backgroundColor}
        titleVariant="h4"
        descriptionVariant="body5"
        containerCustomStyle={{ gap: "12px", padding:isMobile?"120px 0 42px 0": "70px 0 60px 0" }}
        titleCustomContainerStyle={{ gap: "8px" }}
        titleColor={themeStyle["--theme-color"]}
        customDotContainerStyles={{ marginTop: isMobile?"26px":"16px" }}
      />
    );
  }
  return null;
};
