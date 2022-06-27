import React from 'react';
import styled from '@emotion/styled';

// @ts-expect-error TS(6142): Module '../../themes/RichText' was resolved to '/h... Remove this comment to see the full error message
import RichText from '../../themes/RichText';

type Props = {
    className?: string;
    content?: string;
};

export const MessageSection = ({ className, content }: Props) => (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={className}>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
