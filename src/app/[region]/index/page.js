import { redirect } from "next/navigation";

export function generateStaticParams() {
  return [
    {
      language: "en-us",
      region: "aadc",
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
}

export default function RegionPage({ params = {} }) {
  redirect("/index.html")
}
