import React from 'react';
import PropTypes from 'prop-types';

const LegalInformation = ({ gdpr }) => {
    if (!gdpr) {
        return null;
    }
    return <span>{gdpr}</span>;
};

LegalInformation.propTypes = {
    gdpr: PropTypes.number.isRequired,
};

LegalInformation.defaultProps = {
    gdpr: null,
};

export default LegalInformation;
