import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import TextField from '@material-ui/core/TextField';

const styles = {
    fontFamily: 'Amnesty Trade Gothic',
    //margin: '2em 0',
    width: '100%',
    fontSize: 14,
    //lineHeight: '40px',
    //height: 40,
    minHeight: 50,
    '& > div > fieldset ': { borderRadius: 0 },
    //margin: '15px 0',
};

export const Input = ({ className, ...otherProps }) => (
    <TextField variant="outlined" margin="normal" className={className} {...otherProps} />
);

Input.propTypes = {
    className: PropTypes.string,
};

export default glamorous(Input)(styles);
