import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { Button } from '../themes/Button';
import { routeMatch } from '../propTypes';
import generateUrl from '../services/generateUrl';

const ActButton = ({ match: { params } }) => (
    <Link to={generateUrl('message', params)}>
        <Button label="Ok J'agis" />
    </Link>
);

ActButton.propTypes = {
    match: routeMatch,
};

export default withRouter(ActButton);
