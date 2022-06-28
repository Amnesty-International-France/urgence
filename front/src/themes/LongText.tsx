import React from 'react';

const textToHtml = (str: any) => (str ? str.replace(/(?:\r\n|\r|\n)/g, '<br/>') : '');

type OwnLongTextProps = {
    text: string;
};

// @ts-expect-error TS(2456): Type alias 'LongTextProps' circularly references i... Remove this comment to see the full error message
type LongTextProps = OwnLongTextProps & typeof LongText.defaultProps;

// @ts-expect-error TS(7022): 'LongText' implicitly has type 'any' because it do... Remove this comment to see the full error message
export const LongText = ({ text }: LongTextProps) => (
    <span className="long-text" dangerouslySetInnerHTML={{ __html: textToHtml(text) }} />
);

LongText.defaultProps = {
    text: '',
};

export default LongText;
