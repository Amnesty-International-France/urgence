import React from 'react';
import { withRouter } from 'react-router';

import Link from '../themes/Link';
import { routeMatch } from '../propTypes';
import generateUrl from '../services/generateUrl';

const ToAddressButton = ({
    match: {
        params: { id },
    },
}) => <Link to={generateUrl('address', { id })} label="Voir le address" />;

ToAddressButton.propTypes = {
    match: routeMatch,
};

export default withRouter(ToAddressButton);
