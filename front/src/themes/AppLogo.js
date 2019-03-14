import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import AmnestyLogo from '../icons/AmnestyLogo';
import { withThemeContext } from './ThemeContext';

const styles = {
    position: 'absolute',
    fontSize: 33,
    top: 14,
    left: 14,
    zIndex: 100,
};

export const AppLogo = ({ className, context }) => (
    <div className={className}>
        <AmnestyLogo
            fill0={context.color}
            fill1={context.backgroundColor}
            width="122"
            height="49"
        />
    </div>
);

AppLogo.propTypes = {
    className: PropTypes.string,
    context: PropTypes.shape({
        color: PropTypes.string,
        backgroundColor: PropTypes.string,
    }).isRequired,
};

export default glamorous(withThemeContext(AppLogo))(styles);
