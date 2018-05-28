import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Link from '../themes/Link';
import { routeMatch } from '../propTypes';
import generateUrl from '../services/generateUrl';

const ToUrgentActionPageLink = ({
    label,
    pageName,
    disabled,
    onClick,
    match: {
        params: { id },
    },
}) => (
    <Link onClick={onClick} to={generateUrl(pageName, { id })} label={label} disabled={disabled} />
);

ToUrgentActionPageLink.propTypes = {
    label: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    match: routeMatch,
};

export default withRouter(ToUrgentActionPageLink);
