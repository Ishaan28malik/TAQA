"use client";

import { AnnouncementTile } from "@/components/atoms/AnnouncementTile/AnnouncemenTile";
import { CustomCarousel } from "@/components/atoms/CustomCarousel/CustomCarousel";

export const AnnouncementCarousel = ({ data }) => {
  if (!!data) {
    const { title, description, slides, backgroundColor } = data;
    return (
      <CustomCarousel
        title={title}
        description={description}
        showControls
        showCount
        component={AnnouncementTile}
        slidesData={slides}
        backgroundColor="#9798A926"
        containerCustomStyle={{
          backgroundImage: `url("/assets/images/AnnouncementsBackground.svg")`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition:'bottom',
          padding:'100px 0px'
        }}
      />
    );
  }
  return null;
};
