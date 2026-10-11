import { SupportTile } from "../SupportTile/SupportTile";
import styles from "./supports.module.css";

export const Supports = ({
    availableOptions = []
}) => {
    return (
        <section className={styles.container}>
            {
                availableOptions.map(({
                    icon,
                    title,
                    description
                }, index)=>(
                    <SupportTile 
                        key={`supportTile-${title}-${index}`}
                        icon={icon}
                        title={title}
                        description={description}
                    />
                ))
            }
        </section>
    )
}