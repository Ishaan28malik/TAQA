import { TextOnlySpotLight } from "@/components/molecules/TextOnlySpotLight/TextOnlySpotLight";
import styles from "./templateE.module.css";
import { Typography } from "@/components/atoms/Typography/Typography";
import { Fragment } from "react";
import { sanitize } from "isomorphic-dompurify";
import parse from "html-react-parser";

/**
 * Privacy policy and T&C page template
 * @returns
 */
export const TemplateE = ({ data }) => {
  const { title: PageTitle, content = [] } = data || {};
  return (
    <main className={styles.container}>
      <TextOnlySpotLight title={PageTitle} titleTextVariant="h2" />
      <div className={styles.policyContainer}>
        {content.map(({ title, text = [] }, pIndex) => (
          <section
            key={`${title}-${pIndex}`}
            className={styles.sectionContainer}
            data-aos="fade-up"
            suppressHydrationWarning
          >
            <Typography variant="body1" text={title} />
            {text.map((line, cInd) => (
              <Fragment key={`${PageTitle}-${pIndex}.${cInd}`}>
                {Array.isArray(line) ? (
                  <ul>
                    {line.map((item, sInd) => (
                      <li key={`${PageTitle}-${pIndex}.${cInd}.${sInd}`}>
                        <Typography
                          variant="body5"
                          text={parse(sanitize(item))}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography variant="body5" text={parse(sanitize(line))} />
                )}
              </Fragment>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
};
