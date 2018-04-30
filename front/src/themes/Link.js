import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import { Button } from '../themes/Button';

export const Link = ({ to, label }) => (
    <RouterLink to={to}>
        <Button label={label} />
    </RouterLink>
);

Link.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};
