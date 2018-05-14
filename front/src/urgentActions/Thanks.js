import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

export const Thanks = ({ className }) => (
    <div className={className}>
        <h1>Merci de votre soutien !</h1>
    </div>
);

Thanks.propTypes = {
    className: PropTypes.string.isRequired,
};

export default glamorous(Thanks)({
    '& h1': {
        padding: '2rem 3rem',
        textAlign: 'center',
    },
});
