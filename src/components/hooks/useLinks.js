"use client";
import { useParams } from "next/navigation";
import { useCallback } from "react";

export const useLinks = ()=>{
    const { language, region, section } = useParams();

    const prepLink = useCallback(
        (link = "", suffix = "") => {
          return `${link
            .replace(/{{region}}/g, region)
            .replace(/{{language}}/g, language)
            .replace(/{{section}}/g, section)}/${suffix.replace(/\s/g, "-")}`.toLocaleLowerCase();
        },
        [language, region, section]
      );
    
      return { prepLink }
}