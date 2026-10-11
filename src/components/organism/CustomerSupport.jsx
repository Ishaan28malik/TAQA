import React from "react";
import SupportOption from "../atoms/SupportOption/SupportOption";
import { useParams } from "next/navigation";

// styles
import styles from "./customerSupport.module.css";

const CustomerSupport = ({ hideLocation = false }) => {
  const { region, language, section } = useParams();
  const baseURL = `/${region}/${language}/${section}`;

  return (
    <div
      className={styles.container}
      data-aos="fade-up"
      suppressHydrationWarning
    >
      <div className={styles.subContainer}>
        <SupportOption
          imgsrc={"chatSupport"}
          header={language === "en-us" ? "CHAT WITH US" : "تحدث معنا"}
          subheader={
            language === "en-us"
              ? "Instant online chat for quick assistance"
              : "دردشة فورية عبر الإنترنت للحصول على مساعدة سريعة"
          }
          link={""}
          dataAosAttr={{ "data-aos": "fade-right", "data-aos-delay": 100 }}
        />
        <SupportOption
          imgsrc={"videoSupport"}
          header={
            language === "en-us" ? "CONNECT VIA VIDEO" : "التواصل عبر   الفيديو"
          }
          subheader={
            language === "en-us"
              ? "Instant, personalised video support for exceptional assistance"
              : "دعم فوري وشخصي عن طريق الفيديو للحصول على مساعدة استثنائية"
          }
          link={""}
          dataAosAttr={{ "data-aos": "fade-right", "data-aos-delay": 100 }}
        />
        <SupportOption
          imgsrc={"callSupport"}
          header={
            language === "en-us" ? "CALL US: 8002332" : "اتصل بنا على: 8002332"
          }
          subheader={
            language === "en-us"
              ? "Accessible call centre for efficient customer service."
              : "لضمان سهولة التواصل وخدمة عملائنا بكفاءة"
          }
          link="tel:8002332"
          dataAosAttr={{ "data-aos": "fade-right", "data-aos-delay": 200 }}
        />
        {!hideLocation && (
          <SupportOption
            imgsrc={"globalSupport"}
            header={
              language === "en-us"
                ? "FIND A LOCATION"
                : "ابحث عن مركز خدمة العملاء	"
            }
            subheader={
              language === "en-us"
                ? "Locate the nearest branch for in-person assistance."
                : "ابحث عن أقرب مراكز خدمة العملاء إلى موقعك للحصول على المساعدة اللازمة."
            }
            link={`${baseURL}/locations/branches`}
            dataAosAttr={{ "data-aos": "fade-right", "data-aos-delay": 100 }}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerSupport;
