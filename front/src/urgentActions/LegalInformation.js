import React from 'react';
import PropTypes from 'prop-types';

import RichText from '../themes/RichText';

const LegalInformation = ({ content }) => {
    if (!content) {
        return null;
    }
    return <RichText className="legal-information" html={content} />;
};

LegalInformation.propTypes = {
    content: PropTypes.string.isRequired,
};

LegalInformation.defaultProps = {
    content: null,
};

export default LegalInformation;
