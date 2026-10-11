"use client";

import { OldSiteRedirectModal } from "@/components/atoms/OldSiteRedirectModal/OldSiteRedirectModal";
import { REDIRECT_PROMPT_LS_KEY } from "@/constants/common";
import { createContext, useCallback, useState } from "react";

export const OldSiteRedirectModalContext = createContext();
export const OldSiteRedirectModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLink, setModalLink] = useState("");
  const [openInNewTab, setOpenInNewTab] = useState(false);

  const handleRedirect = useCallback(
    (event, hrefLink, openInNewTab = false) => {
      const doNotPromptRedirect = !!localStorage.getItem(
        REDIRECT_PROMPT_LS_KEY
      );
      if (!doNotPromptRedirect) {
        event.preventDefault();
        // Setting properties of redirect modal
        setIsModalOpen(true);
        setModalLink(hrefLink);
        setOpenInNewTab(openInNewTab);
      }
    },
    []
  );

  return (
    <OldSiteRedirectModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        setModalLink,
        handleRedirect,
      }}
    >
      {children}
      <OldSiteRedirectModal
        isModalOpen={!!modalLink && isModalOpen}
        setIsModalOpen={setIsModalOpen}
        link={modalLink}
        openInNewTab={openInNewTab}
      />
    </OldSiteRedirectModalContext.Provider>
  );
};
