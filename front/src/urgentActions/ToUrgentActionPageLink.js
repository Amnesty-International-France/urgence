import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Link from '../themes/Link';
import { routeMatch } from '../propTypes';
import generateUrl from '../services/generateUrl';

export const ToUrgentActionPageLink = ({
    label,
    pageName,
    disabled,
    onClick,
    match: {
        params: { id },
    },
    analyticsCategory,
    buttonName,
    step,
    whiteLink,
}) => (
    <Link
        onClick={onClick}
        to={generateUrl(pageName, { id })}
        label={label}
        disabled={disabled}
        analyticsCategory={analyticsCategory}
        buttonName={buttonName}
        step={step}
        whiteLink={whiteLink}
    />
);

ToUrgentActionPageLink.propTypes = {
    label: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    match: routeMatch,
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
    buttonName: PropTypes.string,
    whiteLink: PropTypes.bool,
};

ToUrgentActionPageLink.defaultProps = {
    whiteLink: false,
};

export default withRouter(ToUrgentActionPageLink);
