import Image from "next/image";
import ImageFrameResidential from "@/assets/images/HeaderImageResidential.png";
import ImageFrameBusiness from "@/assets/images/HeaderImageBusiness.png";
import styles from "./headerFrame.module.css";
import { useParams } from "next/navigation";
import { Typography } from "../atoms/Typography/Typography";
import { useIsMobile } from "../hooks/useIsMobile";

const HeaderFrame = ({ data }) => {
  const {
    section = "",
    language = "",
    region = "",
    helpTopic = "",
  } = useParams();

  const [isMobile] = useIsMobile();
  const isRtl = language.toLowerCase() === "ar-ae";

  return (
    <div
      className={styles.herosection}
      data-aos="fade-up"
      suppressHydrationWarning
    >
      {section === "business" ? (
        <Image
          src={ImageFrameBusiness}
          alt="Expand"
          className={styles.imagesframe}
        />
      ) : (
        <Image
          src={ImageFrameResidential}
          alt="Expand"
          className={styles.imagesframe}
        />
      )}
      <div className={styles.textContainer}>
        <Typography
          variant="caption"
          size="md"
          text={!isRtl ? "HELP & SUPPORT" : "ساعد لدعم"}
          className={styles.title}
        />
        <Typography
          variant={isMobile || isRtl ? "h2" : "h1"}
          text={data.subtitle}
          className={styles.subtitle}
        />
        <Typography
          variant="body4"
          text={data.description}
          className={styles.text}
        />
      </div>
    </div>
  );
};

export default HeaderFrame;
