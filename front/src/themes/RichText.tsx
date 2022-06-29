import React from 'react';
import classnames from 'classnames';
import { black } from 'amnesty-components';

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
    <div
        className={classnames(className, 'rich-text')}
        dangerouslySetInnerHTML={{ __html: html ?? '' }}
        style={{ ...defaultStyle, ...style }}
    />
);

export default RichText;
