import React from 'react';
import PropTypes from 'prop-types';

const textToHtml = str => (str ? str.replace(/(?:\r\n|\r|\n)/g, '<br/>') : '');

export const LongText = ({ text }) => (
    <span className="long-text" dangerouslySetInnerHTML={{ __html: textToHtml(text) }} />
);

LongText.propTypes = {
    text: PropTypes.string.isRequired,
};

LongText.defaultProps = {
    text: '',
};

export default LongText;
