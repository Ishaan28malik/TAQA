import { Typography } from "@/components/atoms/Typography/Typography";
import styles from "./mapHeader.module.css";
import { ServiceSelector } from "@/components/atoms/ServiceSelector/ServiceSelector";
import "react-dropdown/style.css";
import { useTheme } from "@/components/hooks/useTheme";

export const MapHeader = ({
  options,
  selectedService,
  serviceSelector,
  title,
  selectorPlaceholder,
}) => {
  const themeStyle = useTheme();

  return (
    <div className={styles.container}>
      <Typography
        type="heading"
        text={title}
        variant="h4"
        color={themeStyle["--theme-color"]}
      />
      <ServiceSelector
        name="locationsFilter"
        id="service"
        options={options}
        selectedService={selectedService}
        serviceSelector={serviceSelector}
        selectorPlaceholder={selectorPlaceholder}
      />
    </div>
  );
};
