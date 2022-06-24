import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import RichText from '../../themes/RichText';

export const MessageSection = ({ className, content }) => (
    <div className={className}>
        <RichText html={(content || '').trim().replace(/\n/g, '<br>')} />
    </div>
);

MessageSection.propTypes = {
    className: PropTypes.string,
    content: PropTypes.string,
};

export default styled(MessageSection)({
    '& .rich-text, & > p': {
        fontFamily: 'Amnesty Trade Gothic',
        lineHeight: '1.5em',
        padding: '0.5em 1em',
        fontStyle: 'italic',
    },
});
