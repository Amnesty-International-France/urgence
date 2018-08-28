import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import RichText from '../../themes/RichText';

export const MessageStep = ({ className, content }) => (
    <div className={className}>
        <RichText html={(content || '').trim().replace(/\n/g, '<br>')} />
    </div>
);

MessageStep.propTypes = {
    className: PropTypes.string,
    content: PropTypes.string,
};

export default glamorous(MessageStep)(
    {
        '& .rich-text, & > p': {
            fontFamily: 'Amnesty Trade Gothic',
            lineHeight: '1.5em',
            padding: '0.5em 3em',
        },
    },
    ({ darken }) => ({
        backgroundColor: darken ? '#FFF3F3F3' : '#FFFFFF',
    }),
);
