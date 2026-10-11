import { Icon } from "../Icon/Icon";
import { Typography } from "../Typography/Typography";
import styles from "./supportTile.module.css";

export const SupportTile = ({
    icon,
    title,
    description
}) => {
    return(
        <div className={styles.container}>
            <Icon
                name={icon}
                size="md"
            />
            <Typography
                type="heading"
                variant="h6"
                text={title}
            />
            <Typography
                className={styles.description}
                type="text"
                variant="body7"
                text={description}
            />
        </div>
    )
}