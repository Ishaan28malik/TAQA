"use client";
import { useState } from "react";
import data from "@/constants/constantsNew.json";
import PrimaryNavigation from "../PrimaryNavigation";
import Image from "next/image";
import ArrowDownBlack from "@/assets/icons/ArrowDownBlack.png";
import Logo from "@/assets/images/mainLogo.png";
import Header from "../Header";
import { useTheme } from "@/components/hooks/useTheme";
import PrimaryNavigationMobile from "../PrimaryNavigationMobile";
import { useParams } from "next/navigation";
import { SECTIONS_EXCLUDED_FOR_SECONDARY_MENU } from "@/constants/common";

export const CommonHeaderUnit = () => {
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const themeStyle = useTheme();
  const { section = "" } = useParams();
  return (
    <div style={themeStyle}>
      <Header
        showSearchMenu={showSearchMenu}
        setShowSearchMenu={setShowSearchMenu}
      />
      {/* <!-- Primary Navigation Desktop --> */}
      <PrimaryNavigation
        data={data}
        Logo={
          <Image
            src={Logo}
            width={140}
            height={64}
            alt="TAQA Distribution Logo"
          />
        }
        arrowType={
          <Image
            src={ArrowDownBlack}
            alt="Expand"
            width={12}
            height={12}
          />
        }
        showSearchMenu={showSearchMenu}
        setShowSearchMenu={setShowSearchMenu}
        theme="light"
        showSecondaryMenu={
          !SECTIONS_EXCLUDED_FOR_SECONDARY_MENU.includes(section.toLowerCase())
        }
      />
      {/* <!-- Primary Navigation Mobile --> */}
      <PrimaryNavigationMobile
        data={data}
        Logo={
          <Image
            src={Logo}
            width={87}
            height={40}
            alt="TAQA Distribution Logo"
          />
        }
        arrowType={
          <Image
            src={ArrowDownBlack}
            alt="Expand"
            width={12}
            height={12}
          />
        }
        showSearchMenu={showSearchMenu}
        setShowSearchMenu={setShowSearchMenu}
        theme="light"
        showSecondaryMenu={
          !SECTIONS_EXCLUDED_FOR_SECONDARY_MENU.includes(section.toLowerCase())
        }
      />
    </div>
  );
};
