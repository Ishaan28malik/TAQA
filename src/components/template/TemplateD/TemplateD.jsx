"use client";
import { TextOnlySpotLight } from "@/components/molecules/TextOnlySpotLight/TextOnlySpotLight";
import styles from "./templateD.module.css";
import { SitemapSection } from "@/components/molecules/SitemapSection/SitemapSection";
import { useTheme } from "@/components/hooks/useTheme";

/**
 * Sitemap page template
 * @returns
 */
export const TemplateD = ({ data }) => {
  const { title: pageTitle, content = [] } = data;
  const themeStyle = useTheme();
  const anySectionHasMisc = content.some(
    ({ miscLinksGroup }) => !!miscLinksGroup
  );

  return (
    <main style={themeStyle} className={styles.mainContainer}>
      <TextOnlySpotLight title={pageTitle} titleTextVariant="h2" />
      <section className={styles.container}>
        {content.map((contentSection, index) => (
          <SitemapSection
            key={`${contentSection.caption}-${index}`}
            content={contentSection}
            anySectionHasMisc={anySectionHasMisc}
          />
        ))}
      </section>
    </main>
  );
};
