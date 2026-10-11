"use client";
import { redirect, usePathname } from "next/navigation";

const ACCEPTED_REGIONS = ["addc", "aadc"];
const ACCEPTED_LANGUAGES = ["en-us", "ar-ae"];

export default function Custom404() {
  const path = usePathname().toLowerCase();
  const correctedRegion =
    ACCEPTED_REGIONS.find((region) => path.includes(`/${region}`)) ||
    ACCEPTED_REGIONS[0];
  const correctedLanguage =
    ACCEPTED_LANGUAGES.find((lang) => path.includes(`/${lang}`)) ||
    ACCEPTED_LANGUAGES[0];

  // Un-comment the below given code when working in local with yarn run dev
  // if(!path.endsWith('index')){
  //   return redirect(`${path}/index`);
  // }

  return redirect(
    `/${correctedRegion}/${correctedLanguage}/residential/overview`
  );
}
