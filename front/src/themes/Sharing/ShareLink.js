import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import trackEvent from '../../analytics/trackEvent';
import Fab from '@material-ui/core/Fab';
import { secureUseEffect } from '../../hooks/secureHooks';

export const ShareLink = ({
    slug,
    step,
    action,
    href,
    target,
    title,
    text,
    icon,
    customClass,
    customScript,
    analyticsCategory,
    buttonName,
    backgroundColor,
}) => {
    secureUseEffect(() => {
        trackEvent(analyticsCategory, 'Display', 'button', buttonName, slug, step, {
            disabled: 'active',
            label: title,
        });
    });
    return (
        <Fragment>
            {customScript}
            <Fab
                color={'secondary'}
                style={{ backgroundColor }}
                className={classnames(`${customClass}`)}
                href={href}
                size="medium"
                target={target}
                title={title}
                onClick={event => {
                    if (action) action(event);
                    trackEvent(analyticsCategory, 'Click', 'button', buttonName, slug, step, {
                        disabled: 'active',
                        label: title,
                    });
                }}
            >
                <div>
                    <FontAwesomeIcon icon={icon} size="2x" />
                    <span>{text}</span>
                </div>
            </Fab>
        </Fragment>
    );
};

ShareLink.propTypes = {
    slug: PropTypes.string,
    step: PropTypes.string,
    href: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    text: PropTypes.string,
    action: PropTypes.func,
    customClass: PropTypes.string,
    customScript: PropTypes.element,
    analyticsCategory: PropTypes.string,
    buttonName: PropTypes.string,
    backgroundColor: PropTypes.string,
};

ShareLink.defaultProps = {
    target: '_blank',
    action: () => {},
    inLine: false,
    customClass: '',
    customScript: null,
};

export default ShareLink;
