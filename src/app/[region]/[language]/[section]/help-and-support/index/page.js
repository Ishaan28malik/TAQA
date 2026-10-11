import { redirect } from "next/navigation";

export function generateStaticParams() {
  return [
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
}

export default function HelpAndSupportPage({ params = {} }) {
  redirect("/index.html");
}
