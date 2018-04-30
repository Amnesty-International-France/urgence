import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import RichText from '../themes/RichText';
import ToMessageButton from './ToMessageButton';

export const Act = ({ callToAction, className }) => (
    <div className={className}>
        <RichText html={callToAction} />
        <ToMessageButton />
    </div>
);

Act.propTypes = {
    callToAction: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
};

export default glamorous(Act)({
    '& .rich-text': {
        padding: '2rem 3rem',
    },
});
