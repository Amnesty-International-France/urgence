import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import TextField from '@material-ui/core/TextField';

const styles = {
    fontFamily: 'Amnesty Trade Gothic',
    width: '100%',
    fontSize: 14,
    minHeight: 50,
    '& > div > fieldset ': { borderRadius: 0 },
};

export const Input = ({ className, ...otherProps }) => (
    <TextField variant="outlined" margin="normal" className={className} {...otherProps} />
);

Input.propTypes = {
    className: PropTypes.string,
};

export default glamorous(Input)(styles);
