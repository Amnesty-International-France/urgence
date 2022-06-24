import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const styles = {
    fontFamily: 'Amnesty Trade Gothic',
    margin: '2em 0',
    minHeight: '4rem',
    width: '100%',
    fontSize: 14,
    lineHeight: 1.5,
    padding: '0.5rem 1rem',
};

export const TextArea = ({ className, children, ...otherProps }) => (
    <textarea className={className} {...otherProps}>
        {children}
    </textarea>
);

TextArea.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};

export default styled(TextArea)(styles);
