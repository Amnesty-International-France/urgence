import React from 'react';
import styled from '@emotion/styled';

const styles = {
    fontFamily: 'Amnesty Trade Gothic',
    margin: '2em 0',
    minHeight: '4rem',
    width: '100%',
    fontSize: 14,
    lineHeight: 1.5,
    padding: '0.5rem 1rem',
};

type Props = {
    className?: string;
    children?: React.ReactNode;
};

export const TextArea = ({ className, children, ...otherProps }: Props) => (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <textarea className={className} {...otherProps}>
        {children}
    </textarea>
);

export default styled(TextArea)(styles);
