import React from 'react';
import styled from '@emotion/styled';

type Props = {
    className?: string;
    title: string;
    src: string;
};

export const Image = ({ className, src, title }: Props) => {
    let actualSource = src;
    if (src && (src as any).rawFile) {
        actualSource = (src as any).rawFile.preview;
    }
    return (
        <div
            className={className}
            style={{
                backgroundImage: `url(${actualSource})`,
            }}
            title={title}
        />
    );
};

export default styled(Image)({
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '& img': {
        maxWidth: '100%',
    },
    '&:after': {
        content: ' ',
        display: 'block',
        paddingBottom: '56.25%',
    },
});
