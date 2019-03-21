import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { white } from '../../themes/colors';

const styles = {
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 0',
    background: white,
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    userSelect: 'none',
    '&:active': {
        color: 'rgba(0, 0, 0, 0.5)',
    },
    '& .text': {
        position: 'relative',
        '& > .downText': {
            position: 'relative',
            top: 5,
        },
        '& > .upText': {
            position: 'relative',
            top: -3,
        },
    },
};

const StyledSpan = glamorous.span(styles);

const ShowButton = ({ showAllText, action }) => (
    <StyledSpan onClick={action}>
        {showAllText ? (
            <span className="text">
                Voir moins&nbsp;&nbsp;
                <strong className="upText">︿</strong>
            </span>
        ) : (
            <span className="text">
                Voir plus&nbsp;&nbsp;
                <strong className="downText">﹀</strong>
            </span>
        )}
    </StyledSpan>
);

ShowButton.propTypes = {
    showAllText: PropTypes.bool,
    action: PropTypes.func.isRequired,
};

ShowButton.defaultProps = {
    showAllText: false,
};

export default ShowButton;
