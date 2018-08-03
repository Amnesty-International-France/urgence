import React from 'react';
import PropTypes from 'prop-types';

import { ThemeProvider } from '../../../front/src/themes/ThemeContext';
import { Router } from '../../../front/src/gateway/ReactRouter';

export const FrontPreview = ({ className, children }) => (
    <div className={`${className} preview`}>
        {/* Router is necessary cause ActButton needs match params passed in its props */}
        <Router>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </Router>
    </div>
);

FrontPreview.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export const noop = () => { };

export default FrontPreview;
