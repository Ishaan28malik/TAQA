import { useContext } from "react";
import styles from "./weareHereToHelp.module.css";
import { useParams } from "next/navigation";
import { Typography } from "../Typography/Typography";
import { OldSiteRedirectModalContext } from "@/components/organism/OldSiteRedirectModalProvider/OldSiteRedirectModalProvider";
import { useIsMobile } from "@/components/hooks/useIsMobile";

const WeAreHereToHelp = ({ data }) => {
  const { language } = useParams();
  const { handleRedirect } = useContext(OldSiteRedirectModalContext);
  const [isMobile] = useIsMobile();

  const handleClick = (event, link) => {
    const doNotPromptRedirect = localStorage.getItem("doNotPromptRedirect");
    if (doNotPromptRedirect) {
      window.location.href = link;
    } else {
      handleRedirect(event, link);
    }
  };

  if (!data.quickLinks || data.quickLinks.length === 0) return null;

  return (
    <div className={styles.container} data-aos="fade-up">
      <div className={styles.header}>
        <Typography
          variant='h5'
          text={
            language === "en-us" ? "WE ARE HERE TO HELP" : "نحن هنا لمساعدتك"
          }
        />
      </div>
      <ul className={styles.linkTextContainer}>
        {data.quickLinks.map((item, index) => (
          <li className={styles.linkItem} key={index}>
            {"\u2022"}&nbsp;&nbsp;&nbsp;
            <a
              href="#"
              onClick={(event) => handleClick(event, item.quickLinkUrl)}
              className={styles.animatedLink}
            >
              <Typography variant={isMobile ? 'body4' : 'body5'} text={item.link} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeAreHereToHelp;
