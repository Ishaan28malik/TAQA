"use client";
import React from "react";
import { useParams } from "next/navigation";
import { FindYourSolutionCarousel } from "../molecules/FindYourSolutionCarousel/FindYourSolutionCarousel";

const FindYourSolutionService = ({ data }) => {
  const { language = "" } = useParams();

  return (
    <FindYourSolutionCarousel
      data={{
        title:
          language === "en-us" ? "FIND YOUR SOLUTION" : "اختر الحلول المناسبة",
        description: language === "en-us" ? data.itemsHeader : data.itemsHeader,
        slides: data.items,
      }}
    />
  );
};

export default FindYourSolutionService;
