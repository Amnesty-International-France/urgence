import React from 'react';
import PropTypes from 'prop-types';

const textToHtml = str => str.replace(/(?:\r\n|\r|\n)/g, '<br/>');

export const LongText = ({ text }) => (
    <span dangerouslySetInnerHTML={{ __html: textToHtml(text) }} />
);

LongText.propTypes = {
    text: PropTypes.string,
};

export default LongText;
