import React from 'react';
import { withRouter } from 'react-router';

import Link from '../themes/Link';
import { routeMatch } from '../propTypes';
import generateUrl from '../services/generateUrl';

const ActButton = ({ match: { params } }) => (
    <Link to={generateUrl('act', params)} label="OK J'agis!" />
);

ActButton.propTypes = {
    match: routeMatch,
};

export default withRouter(ActButton);
