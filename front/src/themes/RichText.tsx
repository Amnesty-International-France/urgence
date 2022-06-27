import React from 'react';
import classnames from 'classnames';
import { black } from '../themes/colors';

const defaultStyle = {
    color: black,
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: '18px',
    '@media (minWidth: 1024px)': {
        fontSize: '18px !important',
    },
};

type Props = {
    className?: string;
    html?: string;
    style?: any;
};

export const RichText = ({ className, html, style }: Props) => (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div
        className={classnames(className, 'rich-text')}
        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
        dangerouslySetInnerHTML={{ __html: html }}
        style={{ ...defaultStyle, ...style }}
    />
);

export default RichText;
