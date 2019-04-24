import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { black } from './colors';

const styles = {
    root: {
        textDecoration: 'none',
        color: black,
        fontFamily: 'Amnesty Trade Gothic LT',
        fontSize: 16,
    },
    svg: {
        width: '100%',
        height: '100%',
    },
    icon: {
        border: '1px solid #000',
        borderRadius: '50%',
        alignItems: 'center',
        width: 50,
        height: 50,
        padding: 10,
        lineHeight: '50px',
        display: 'flex',
        justifyContent: 'center',
        marginRight: 10,
    },
};

export const LinkFacebook = ({ classes, text }) => (
    <Button
        className={classnames(classes.root, 'twitter-share-button')}
        href={`https://twitter.com/intent/tweet?text=${text}`}
        target="facebook"
        title="Partage facebook"
    >
        <span className={classes.icon}>
            <svg
                preserveAspectRatio="xMidYMid"
                width="16.69"
                height="14.24"
                viewBox="0 0 16.69 14.24"
                className={classes.svg}
            >
                <path d="M16.689,1.686 C16.075,1.972 15.416,2.165 14.724,2.252 C15.430,1.807 15.973,1.103 16.228,0.264 C15.567,0.676 14.835,0.975 14.056,1.136 C13.432,0.438 12.543,0.001 11.559,0.001 C9.670,0.001 8.138,1.610 8.138,3.595 C8.138,3.877 8.168,4.151 8.227,4.414 C5.384,4.264 2.863,2.833 1.176,0.659 C0.881,1.189 0.712,1.807 0.712,2.466 C0.712,3.712 1.317,4.813 2.234,5.457 C1.674,5.438 1.146,5.277 0.685,5.007 C0.685,5.023 0.685,5.037 0.685,5.053 C0.685,6.794 1.864,8.246 3.429,8.577 C3.142,8.659 2.840,8.703 2.527,8.703 C2.307,8.703 2.093,8.680 1.884,8.638 C2.319,10.066 3.583,11.105 5.080,11.134 C3.909,12.098 2.434,12.673 0.831,12.673 C0.555,12.673 0.283,12.655 0.015,12.622 C1.529,13.642 3.327,14.237 5.259,14.237 C11.551,14.237 14.992,8.761 14.992,4.011 C14.992,3.856 14.988,3.701 14.982,3.546 C15.650,3.040 16.230,2.407 16.689,1.686 L16.689,1.686 Z" />
            </svg>
        </span>
        Partager sur facebook
    </Button>
);

LinkFacebook.propTypes = {
    text: PropTypes.string.isRequired,
};

LinkFacebook.defaultProps = {
    text: '',
};

export default withStyles(styles)(LinkFacebook);
