import React from 'react';
import PropTypes from 'prop-types';

import Title from './primitives/Title';

const UA = ({
    match: {
        params: { id },
    },
}) => <Title>UA {id}</Title>;

UA.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }),
    }),
};

export default UA;
