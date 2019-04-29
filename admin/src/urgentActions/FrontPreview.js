import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { ThemeProvider } from '../../../front/src/themes/ThemeContext';
import AppLogo from '../../../front/src/themes/AppLogo';

const styles = {
    logo: {
        position: 'relative',
        width: 'fit-content !important',
        height: 'fit-content !important',
        padding: '0px !important',
    },
};

export const FrontPreview = ({ classes, className, children }) => (
    <div className={`${className} preview`}>
        <ThemeProvider>
            <div className={classes.logo}>
                <AppLogo />
            </div>
            {children}
        </ThemeProvider>
    </div>
);

FrontPreview.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export const noop = () => {};

export default withStyles(styles)(FrontPreview);
