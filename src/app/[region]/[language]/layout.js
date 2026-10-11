"use client";
import { BaseTemplate } from "@/components/atoms/BaseTemplate/BaseTemplate";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import classNames from "classnames";
import {
  groldMedium,
  groldRegular,
  robotoMedium,
  robotoRegular,
  bukraRegular,
  bukraSemiBold,
  ibmPlexMedium,
  ibmPlexRegular,
  ibmPlexSemiBold,
} from "@/styles/fonts/fonts";

export default function RootLayout({ children, params: { language } }) {
  const dir = language === "ar-ae" ? "rtl" : "ltr";

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const fontClasses = classNames([
    groldMedium.variable,
    groldRegular.variable,
    robotoMedium.variable,
    robotoRegular.variable,
    bukraRegular.variable,
    bukraSemiBold.variable,
    ibmPlexMedium.variable,
    ibmPlexRegular.variable,
    ibmPlexSemiBold.variable,
  ]);

  return (
    <html dir={dir} lang={language}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={fontClasses}>
        <BaseTemplate>{children}</BaseTemplate>
      </body>
    </html>
  );
}
