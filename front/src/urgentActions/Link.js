import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { black } from '../themes/colors';

const styles = {
    textAlign: 'center',
    '@media (min-width: 1024px)': {
        textAlign: 'right',
        marginRight: '1rem',
    },
    '& a': {
        fontSize: '1rem',
    },
};

export const Link = ({ className, color, url, label }) => (
    <div className={`link ${className}`}>
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ color }}>
            {label || url}
        </a>
    </div>
);

Link.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    url: PropTypes.string.isRequired,
    label: PropTypes.string,
};

Link.defaultProps = {
    color: black,
};

export default styled(Link)(styles);
