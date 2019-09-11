import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { black } from '../themes/colors';

const defaultStyle = {
    color: black,
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: '16px',
};

export const RichText = ({ className, html, style }) => (
    <div
        className={classnames(className, 'rich-text')}
        dangerouslySetInnerHTML={{ __html: html }}
        style={{ ...defaultStyle, ...style }}
    />
);

RichText.propTypes = {
    className: PropTypes.string,
    html: PropTypes.string,
    style: PropTypes.object,
};

export default RichText;
