import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { withThemeContext } from './ThemeContext';

const Rectangle = styled('div')(
    {
        zIndex: -1,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '30vh',
    },
    ({ color }) => ({
        backgroundColor: color,
    }),
);

const Triangle = styled('div')(
    {
        zIndex: -1,
        position: 'fixed',
        top: '30vh',
        left: 0,
        width: 0,
        height: 0,
        borderRight: '100vw solid transparent',
    },
    ({ color }) => ({
        borderTop: `50vh solid ${color}`,
    }),
);

export const AppBackground = ({ className, context }) => (
    <div className={className}>
        <Rectangle color={context.backgroundColor} />
        <Triangle color={context.backgroundColor} />
    </div>
);

AppBackground.propTypes = {
    className: PropTypes.string,
    context: PropTypes.shape({
        backgroundColor: PropTypes.string,
        logoColor: PropTypes.string,
        logoBackgroundColor: PropTypes.string,
    }).isRequired,
};

export default withThemeContext(AppBackground);
