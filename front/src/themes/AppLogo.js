import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { AmnestyCandle } from '../icons';
import { withThemeContext } from './ThemeContext';

const styles = {
    position: 'absolute',
    fontSize: 33,
    top: 14,
    left: 14,
    zIndex: 100,
    '& svg': {
        filter: 'drop-shadow(0 0 2px #0004)',
    },
};

export const AppLogo = ({ className, context }) => (
    <div className={className}>
        <AmnestyCandle fill={context.logoColor} />
    </div>
);

AppLogo.propTypes = {
    className: PropTypes.string,
    context: PropTypes.shape({
        logoColor: PropTypes.string,
    }).isRequired,
};

export default glamorous(withThemeContext(AppLogo))(styles);
