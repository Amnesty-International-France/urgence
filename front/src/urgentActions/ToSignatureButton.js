import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import Link from '../themes/Link';
import { routeMatch } from '../propTypes';
import generateUrl from '../services/generateUrl';

const ToSignatureButton = ({
    disabled,
    match: {
        params: { id },
    },
}) => <Link to={generateUrl('signature', { id })} label="Valider" disabled={disabled} />;

ToSignatureButton.propTypes = {
    match: routeMatch,
    disabled: PropTypes.bool,
};

export default withRouter(ToSignatureButton);
