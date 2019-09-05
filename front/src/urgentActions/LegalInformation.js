import React from 'react';
import PropTypes from 'prop-types';

const LegalInformation = ({ content }) => {
    if (!content) {
        return null;
    }
    return <span>{content}</span>;
};

LegalInformation.propTypes = {
    content: PropTypes.string.isRequired,
};

LegalInformation.defaultProps = {
    content: null,
};

export default LegalInformation;
