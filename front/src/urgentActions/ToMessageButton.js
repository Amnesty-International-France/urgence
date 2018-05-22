import React from 'react';
import { withRouter } from 'react-router';

import Link from '../themes/Link';
import { routeMatch } from '../propTypes';
import generateUrl from '../services/generateUrl';

const ToMessageButton = ({
    match: {
        params: { id },
    },
}) => <Link to={generateUrl('message', { id })} label="Voir le message" />;

ToMessageButton.propTypes = {
    match: routeMatch,
};

export default withRouter(ToMessageButton);
