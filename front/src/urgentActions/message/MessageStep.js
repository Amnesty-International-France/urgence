import React from 'react';
import PropTypes from 'prop-types';

import RichText from '../../themes/RichText';
import CarouselSlide from '../../themes/CarouselSlide';

export const MessageStep = ({ className, content }) => (
    <CarouselSlide className={className}>
        <RichText html={content.replace(/\n/g, '<br>')} />
    </CarouselSlide>
);

MessageStep.propTypes = {
    className: PropTypes.string,
    content: PropTypes.string,
};

export default MessageStep;
