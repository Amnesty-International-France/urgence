import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import RichText from '../themes/RichText';
import ToMessageButton from './ToMessageButton';

export const Act = ({ callToAction, className }) => (
    <div className={className}>
        <h1>Génial !</h1>
        <RichText html={callToAction} />
        <ToMessageButton />
    </div>
);

Act.propTypes = {
    callToAction: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
};

export default glamorous(Act)({
    '& h1': {
        padding: '2rem 3rem',
        textAlign: 'center',
    },
    '& .rich-text': {
        padding: '2rem 3rem',
        textAlign: 'justify',
        fontSize: 24,
        lineHeight: '3rem',
    },
});
