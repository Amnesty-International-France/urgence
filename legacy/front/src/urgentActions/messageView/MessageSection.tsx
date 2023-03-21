import React from 'react';
import styled from '@emotion/styled';

import { RichText } from 'amnesty-components';

type Props = {
    className?: string;
    content?: string;
};

export const MessageSection = ({ className, content }: Props) => (
    <div className={className}>
        <RichText html={(content || '').trim().replace(/\n/g, '<br>')} />
    </div>
);

export default styled(MessageSection)({
    '& .rich-text, & > p': {
        fontFamily: 'Amnesty Trade Gothic',
        lineHeight: '1.5em',
        padding: '0.5em 1em',
        fontStyle: 'italic',
    },
});
