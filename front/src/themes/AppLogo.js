import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import AmnestyLogo from '../icons/AmnestyLogo';
import { withThemeContext } from './ThemeContext';

const styles = {
    position: 'absolute',
    fontSize: 33,
    top: 80,
    left: 0,
    zIndex: 100,
};

export const AppLogo = ({ className, context }) => (
    <div className={className}>
        <AmnestyLogo
            fill0={context.logoBackgroundColor}
            fill1={context.logoColor}
            width="122"
            height="49"
        />
    </div>
);

AppLogo.propTypes = {
    className: PropTypes.string,
    context: PropTypes.shape({
        backgroundColor: PropTypes.string,
        logoColor: PropTypes.string,
        logoBackgroundColor: PropTypes.string,
    }).isRequired,
};

export default styled(withThemeContext(AppLogo))(styles);
