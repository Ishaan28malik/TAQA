"use client";

// Components
import HeaderFrame from "@/components/organism/HeaderFrame";
import SolutionsCarousel from "@/components/organism/SolutionsCarousel";
import FAQPanel from "@/components/organism/FAQPanel";
import CustomerSupport from "@/components/organism/CustomerSupport";
import { useTheme } from "@/components/hooks/useTheme";
import { useParams } from "next/navigation";
import FindYourSolutionService from "@/components/organism/FindYoursolutionService";

const TemplateB = ({ topicData }) => {
  const themeStyle = useTheme();
  const { section } = useParams();
  return (
    <main style={themeStyle}>
      <HeaderFrame data={topicData} />
      {/* Header Unit */}
      <FindYourSolutionService data={topicData}/>
      {/* Soltuions Carousel */}
      {section !== "business" && <SolutionsCarousel data={topicData} />}
      <FAQPanel data={topicData} />
      <CustomerSupport />
    </main>
  );
};

export default TemplateB;
