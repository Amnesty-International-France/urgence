import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const styles = {
    fontFamily: 'Amnesty Trade Gothic',
    margin: '2em 0',
    width: '100%',
    fontSize: 14,
    lineHeight: '40px',
    height: 40,
    padding: '0 15px',
};

export const Input = ({ className, ...otherProps }) => (
    <input className={className} {...otherProps} />
);

Input.propTypes = {
    className: PropTypes.string,
};

export default glamorous(Input)(styles);
