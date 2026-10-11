import classNames from 'classnames';
import styles from './icon.module.css';
import PropTypes from 'prop-types';
import { Suspense } from 'react';
import { SVGIcon } from './SVGIcon';

export function Icon({
    name,
    type,
    size,
    hasBorder,
    color,
}) {

    const iconClasses = classNames({
        [styles["icon"]]: true,
        [styles[`icon-${type}`]]: type==="tertiary",
        [styles[`icon-${size}`]]: true,
        [styles["icon-bordered"]]: hasBorder
    });

    const iconStyle = {
        '--icon-color': color || '#0AB3A1',
    };


    return (
        <div className={iconClasses} style={iconStyle}>
            <Suspense fallback="...">
                <SVGIcon
                    name={name} />
            </Suspense>
        </div>
    )
}

Icon.propTypes = {
    name: PropTypes.oneOf(['forwardArrow']).isRequired,
    type: PropTypes.oneOf(['tertiary']).isRequired,
    size: PropTypes.oneOf(['lg']),
    hasBorder: PropTypes.bool
}