import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { white } from '../../themes/colors';

const styles = {
    '& .showButton': {
        fontFamily: 'Amnesty Trade Gothic LT',
        fontSize: '16px',
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        padding: '20px 0',
        background: white,
        '&:active': {
            color: 'rgba(0, 0, 0, 0.5)',
        },
    },
    '& .text': {
        position: 'relative',
        '& > .downText': {
            position: 'relative',
            top: 8,
        },
        '& > .upText': {
            position: 'relative',
            top: -4,
        },
    },
};

const StyledSpan = glamorous.span(styles);

const ShowButton = ({ showAllText, action }) => (
    <StyledSpan className="showButton" onClick={action}>
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
