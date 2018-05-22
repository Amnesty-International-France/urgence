import React from 'react';
import { withRouter } from 'react-router';

import Link from '../themes/Link';
import { routeMatch } from '../propTypes';
import generateUrl from '../services/generateUrl';

const ToSignatureButton = ({
    match: {
        params: { id },
    },
}) => <Link to={generateUrl('signature', { id })} label="Valider" />;

ToSignatureButton.propTypes = {
    match: routeMatch,
};

export default withRouter(ToSignatureButton);
