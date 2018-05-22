import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { AmnestyCandle } from '../icons';
import { ThemeConsumer } from './ThemeContext';

const styles = {
    position: 'absolute',
    top: 14,
    left: 14,
    zIndex: 100,
    '& svg': {
        filter: 'drop-shadow(0 0 2px #0004)',
    },
};

export const AppLogo = ({ className }) => (
    <ThemeConsumer>
        {context => {
            return (
                <div className={className}>
                    <AmnestyCandle size={33} color={context.logoColor} />
                </div>
            );
        }}
    </ThemeConsumer>
);

AppLogo.propTypes = {
    className: PropTypes.string,
};

export default glamorous(AppLogo)(styles);
