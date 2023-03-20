import React from 'react';
import styled from '@emotion/styled';
import get from 'lodash.get';
import Paper from '@mui/material/Paper';

import { white, black } from '../themes/colors';
import RichText from '../themes/RichText';
import MobileDetect from 'mobile-detect';

const styles = {
    position: 'relative',
    margin: '60px 15px 15px',
    '& .paper': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        minHeight: '300px',
        '@media (min-width: 1024px)': {
            height: '85vh',
        },
    },
    '& .step': {
        margin: '100px 20px 60px',
        '@media (min-width: 350px)': {
            margin: '260px 20px 80px',
        },
    },
    '& .content': {
        display: 'flex',
        flex: '1 0 0',
        alignItems: 'flex-end',
    },
    '& .rich-text > p, & .rich-text > h1, & .rich-text > h2': {
        fontFamily: 'Amnesty Trade Gothic Condensed',
        textTransform: 'uppercase',
        margin: '0 12px',
        width: 'calc(100% - 24px)',
        fontSize: '18px',
        '@media (min-width: 1024px)': {
            fontSize: '24px',
        },
    },
    '& .ql-size-large, & .rich-text > h2': {
        display: 'inline',
        color: white,
        backgroundColor: black,
        fontSize: '26px',
        padding: '4px 0',
        lineHeight: '39px',
        boxShadow: `12px 0 0 ${black}, -12px 0 0 ${black}`,
        boxDecorationBreak: 'clone',
        '&::before': {
            content: "''",
            display: 'block',
        },
        '@media (min-width: 1024px)': {
            fontSize: '52px',
            lineHeight: '78px',
            padding: '8px 0',
        },
    },
    '& .ql-size-huge, & .rich-text > h1': {
        display: 'inline',
        color: black,
        backgroundColor: white,
        fontSize: '36px',
        lineHeight: '54px',
        padding: '6px 0',
        boxShadow: `12px 0 0 ${white}, -12px 0 0 ${white}`,
        boxDecorationBreak: 'clone',
        '@media (min-width: 1024px)': {
            fontSize: '72px',
            lineHeight: '110px',
            padding: '12px 0',
        },
    },
};
const isOnMobile = () => {
    const md = new MobileDetect(global.navigator.userAgent);
    return md.mobile();
};

type StoryCoverProps = {
    className?: string;
    content: string;
    medium?: {
        src: string;
    };
    mediumDesktop?: {
        src: string;
    };
    isMobile?: boolean;
};
export const StoryCover = ({
    className,
    content,
    medium,
    mediumDesktop,
    isMobile,
}: StoryCoverProps) => {
    const currentMedium = isMobile || isOnMobile() || !mediumDesktop ? medium : mediumDesktop;
    const src = get(currentMedium, 'src.rawFile.preview') || get(currentMedium, 'src');
    const imageSrc = typeof src === 'string' ? src : '';
    const lastUrlParam = /\/([^/]*$)/;
    const croppedImageSrc = imageSrc.replace(lastUrlParam, '/crop-$1');

    return (
        <div className={className}>
            <Paper
                className="paper"
                style={{
                    backgroundImage: `url(${croppedImageSrc}), url(${imageSrc})`,
                    backgroundPosition: 'top',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
                elevation={6}
                square
            >
                <div className="step">
                    <div className="content">
                        <RichText html={content} />
                    </div>
                </div>
            </Paper>
        </div>
    );
};

// @ts-expect-error TS(2769): No overload matches this call.
export default styled(StoryCover)(styles);
