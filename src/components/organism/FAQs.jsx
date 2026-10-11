import React, { useState, useEffect, useRef } from "react";
import styles from "./faqsection.module.css";
import { useTheme } from "../hooks/useTheme";
import { useParams } from "next/navigation";
import { Typography } from "../atoms/Typography/Typography";
import data from "@/constants/faqsData.json";
import { LinkButton } from "../atoms/LinkButton/LinkButton";
import { useIsMobile } from "../hooks/useIsMobile";

const FAQSection = () => {
  const { faqsDataADDC, faqsDataAADC } = data;
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFAQIndex, setOpenFAQIndex] = useState(null);
  const themeStyle = useTheme();
  const { region, language, helpTopic } = useParams();
  const [displayedFaqs, setDisplayedFaqs] = useState([]);
  const dataToUse = region === "addc" ? faqsDataADDC : faqsDataAADC;

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const categoriesRef = useRef(null);
  const [isMobile] = useIsMobile();

  const startDragging = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - categoriesRef.current.offsetLeft);
    setScrollLeft(categoriesRef.current.scrollLeft);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - categoriesRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    categoriesRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const allQuestions = dataToUse.reduce(
      (acc, faq) => acc.concat(faq.questions),
      []
    );
    setFaqs(allQuestions);
    setDisplayedFaqs(allQuestions.slice(0, 4));
    const extractedCategories = dataToUse.map((item) =>
      language !== "en-us" ? item.category_ar : item.category
    );
    setCategories(["All", ...extractedCategories]);
  }, [faqsDataADDC, language]);

  useEffect(() => {
    if (helpTopic) {
      const formattedHelpTopic = helpTopic
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
        .toLowerCase();

      const filteredFaqs = faqsDataADDC
        .filter((item) =>
          item.parent_category
            .map((category) => category.toLowerCase())
            .includes(formattedHelpTopic)
        )
        .reduce((acc, faq) => acc.concat(faq.questions), []);

      const Cat = [
        "All",
        ...faqsDataADDC
          .filter((item) =>
            item.parent_category
              .map((category) => category.toLowerCase())
              .includes(formattedHelpTopic)
          )
          .map((faq) =>
            language !== "en-us" ? faq.category_ar : faq.category
          ),
      ];

      setCategories(Cat);
      setFaqs(filteredFaqs);
      setDisplayedFaqs(filteredFaqs.slice(0, 4));
    }
  }, [helpTopic, faqsDataADDC, language]);

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  const filterFAQs = (category) => {
    if (category === "All") {
      const allQuestions = dataToUse.reduce(
        (acc, faq) => acc.concat(faq.questions),
        []
      );
      setFaqs(allQuestions);
      setDisplayedFaqs(allQuestions.slice(0, 4));
    } else {
      const categoryData = dataToUse.find((cat) =>
        language !== "en-us"
          ? cat.category_ar === category
          : cat.category === category
      );
      setFaqs(categoryData ? categoryData.questions : []);
      setDisplayedFaqs(categoryData ? categoryData.questions.slice(0, 4) : []);
    }
    setActiveCategory(category);
    setOpenFAQIndex(null);
  };

  const convertToJSX = (str) => {
    const linkRegex = /<link>(.*?)<link>/g;
    const parts = str.split(linkRegex);

    return (
      <div>
        {parts.map((part, index) =>
          index % 2 === 0 ? (
            part
          ) : (
            <a href={part} key={index} style={{ color: themeStyle["--color-purple"] }}>
              {part}
            </a>
          )
        )}
      </div>
    );
  };

  const loadMoreFAQs = () => {
    setDisplayedFaqs((prevDisplayedFaqs) => [
      ...prevDisplayedFaqs,
      ...faqs.slice(prevDisplayedFaqs.length, prevDisplayedFaqs.length + 4),
    ]);
  };

  return (
    <div
      className={styles.container}
      data-aos="fade-up"
      suppressHydrationWarning
    >
      <div className={styles.header}>
        <Typography
          variant="h4"
          text={
            language === "en-us" ? "LOOKING FOR ANSWERS ?" : "تبحث عن إجابات؟"
          }
        />
      </div>
      <span className={styles.subHeader}>
        <Typography
          variant="body5"
          text={
            language === "en-us"
              ? "These are some of the most common questions our customers have asked us. Browse through them to find your answers."
              : "هذه بعض الأسئلة الشائعة التي طرحها علينا عملاؤنا. قم بتصفحها أو ابحث للعثور على إجاباتك."
          }
        />
      </span>
      <div className={styles.categoriesWrapper}>
        <div
          className={styles.categoriesContainer}
          ref={categoriesRef}
          onMouseDown={startDragging}
          onMouseLeave={stopDragging}
          onMouseUp={stopDragging}
          onMouseMove={onDrag}
          onTouchStart={(e) => startDragging(e.touches[0])}
          onTouchMove={(e) => onDrag(e.touches[0])}
          onTouchEnd={stopDragging}
        >
          {categories.map((category, index) => (
            <button
              key={index}
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                backgroundColor:
                  activeCategory === category
                    ? themeStyle["--theme-color"]
                    : themeStyle["--color-grey-10"],
                color: activeCategory === category ? "#ffffff" : "#1a1a1d",
                border:
                  activeCategory === category
                    ? `1px solid ${themeStyle["--theme-color"]}`
                    : "1px solid #a6a8c5",
              }}
              className={styles.filterButton}
              onClick={() => filterFAQs(category)}
            >
              <Typography
                variant="body6"
                text={
                  category === "All"
                    ? language === "en-us"
                      ? "All"
                      : "الجميع"
                    : category
                }
              />
            </button>
          ))}
        </div>
      </div>
      <div className={styles.faqContainer} style={{marginBottom: '4px'}}>
        {displayedFaqs.map((faq, index) => (
          <React.Fragment key={index}>
            {openFAQIndex !== index && (
              <div className={styles.question} onClick={() => toggleFAQ(index)}>
                <div style={{ display: "flex", alignItems: "center", justifyContent:'space-between', gap:'20px' }}>
                  <span
                    style={{
                      width: "90%",
                      color: themeStyle["--color-grey-75"],
                    }}
                  >
                    <Typography
                      variant={isMobile ? "body3" : "body4"}
                      style="bold"
                      text={
                        language === "en-us" ? faq.question : faq.question_ar
                      }
                    />
                  </span>
                  <span
                    onClick={() => toggleFAQ(index)}
                    style={{
                      cursor: "pointer",
                      fontSize: "22px",
                      width:'22px'
                    }}
                  >
                    {openFAQIndex === index ? "-" : "+"}
                  </span>
                </div>
              </div>
            )}
            {openFAQIndex === index && (
              <div className={styles.answer} onClick={() => toggleFAQ(index)}>
                <div style={{ display: "flex", alignItems: "center",justifyContent:'space-between', gap:'20px' }}>
                  <span className={styles.questionInnerText}>
                    <Typography
                      variant={isMobile ? "body3" : "body4"}
                      style="bold"
                      text={
                        language === "en-us" ? faq.question : faq.question_ar
                      }
                    />
                  </span>
                  <span
                    onClick={() => toggleFAQ(index)}
                    style={{
                      cursor: "pointer",
                      fontSize: "22px",
                      width:'22px'
                    }}
                  >
                    {openFAQIndex === index ? "-" : "+"}
                  </span>
                </div>
                <div className={styles.answerText}>
                  {typeof faq.answer === "string" ? (
                    <Typography
                      variant="body7"
                      text={
                        language === "en-us"
                          ? convertToJSX(faq.answer)
                          : convertToJSX(faq.answer_ar)
                      }
                      className={styles.answerFont}
                    />
                  ) : (
                    <>
                      <Typography
                        variant="body7"
                        text={
                          language === "en-us"
                            ? faq.answer.intro
                            : faq.answer_ar.intro
                        }
                        className={styles.answerFont}
                      />
                      <ul>
                        {language === "en-us"
                          ? faq.answer.points.map((point, idx) => (
                              <li key={idx}>
                                <Typography
                                  variant="body7"
                                  text={convertToJSX(point)}
                                  className={styles.answerFont}
                                />
                              </li>
                            ))
                          : faq.answer_ar.points.map((point, idx) => (
                              <li key={idx}>
                                <Typography
                                  variant="body7"
                                  text={convertToJSX(point)}
                                  className={styles.answerFont}
                                />
                              </li>
                            ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
        {displayedFaqs.length == faqs.length ? (
          ""
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "30px 0px 30px 0px",
            }}
          >
            <LinkButton
              label={language === "en-us" ? "LOAD MORE" : "المزيد "}
              type="primary"
              size="md"
              onClick={loadMoreFAQs}
              customClass={styles.loadMoreButtonMobile}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQSection;
