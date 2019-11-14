import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { grey } from './colors';

const styles = {
    '& .rectangle': {
        zIndex: -1,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '30vh',
        background: grey,
    },
    '& .triangle': {
        zIndex: -1,
        position: 'fixed',
        top: '30vh',
        left: 0,
        width: 0,
        height: 0,
        borderTop: `50vh solid ${grey}`,
        borderRight: '100vw solid transparent',
    },
};

export const AppBackground = ({ className }) => (
    <div className={className}>
        <div className="rectangle" />
        <div className="triangle" />
    </div>
);

AppBackground.propTypes = {
    className: PropTypes.string,
};

export default glamorous(AppBackground)(styles);
