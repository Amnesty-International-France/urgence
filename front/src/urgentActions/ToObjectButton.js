import React from 'react';
import { withRouter } from 'react-router';

import Link from '../themes/Link';
import { routeMatch } from '../propTypes';
import generateUrl from '../services/generateUrl';

const ToObjectButton = ({
    match: {
        params: { id },
    },
}) => <Link to={generateUrl('object', { id })} label="OK, J'envoie le message" />;

ToObjectButton.propTypes = {
    match: routeMatch,
};

export default withRouter(ToObjectButton);
