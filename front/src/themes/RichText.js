import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const RichText = ({ className, html, style }) => (
    <div
        className={classnames(className, 'rich-text')}
        dangerouslySetInnerHTML={{ __html: html }}
        style={style}
    />
);

RichText.propTypes = {
    className: PropTypes.string,
    html: PropTypes.string,
    style: PropTypes.object,
};

export default RichText;
