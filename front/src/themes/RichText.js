import React from 'react';
import PropTypes from 'prop-types';

export const RichText = ({ html, style }) => (
    <div
        className="rich-text"
        dangerouslySetInnerHTML={{ __html: html }}
        style={style}
    />
);

RichText.propTypes = {
    html: PropTypes.string,
    style: PropTypes.object,
};

export default RichText;
