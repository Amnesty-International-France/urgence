import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import get from 'lodash.get';
import Paper from '@material-ui/core/Paper';

import { white, black } from '../../themes/colors';
import RichText from '../../themes/RichText';
import MobileDetect from 'mobile-detect';
import { secureUseEffect, secureUseState } from '../../hooks/secureHooks';

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
    '& .rich-text > p': {
        fontFamily: 'Amnesty Trade Gothic Condensed',
        textTransform: 'uppercase',
        margin: '0 12px',
        width: 'calc(100% - 24px)',
        fontSize: '18px',
        '@media (min-width: 1024px)': {
            fontSize: '24px',
        },
    },
    '& .ql-size-large': {
        color: white,
        backgroundColor: black,
        fontSize: '26px',
        padding: '4px 0',
        lineHeight: '39px',
        boxShadow: `12px 0 0 ${black}, -12px 0 0 ${black}`,
        boxDecorationBreak: 'clone',
        '@media (min-width: 1024px)': {
            fontSize: '52px',
            lineHeight: '78px',
            padding: '8px 0',
        },
    },
    '& .ql-size-huge': {
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
const checkIfImageExists = url => {
    return new Promise(resolve => {
        const img = new Image();
        img.src = url;

        if (img.complete) {
            resolve(true);
        } else {
            img.onload = () => {
                resolve(true);
            };
            img.onerror = () => {
                resolve(false);
            };
        }
    });
};
const isOnMobile = () => {
    const md = new MobileDetect(global.navigator.userAgent);
    return md.mobile();
};
export const StoryCover = ({ className, content, medium, mediumDesktop, isMobile }) => {
    const currentMedium = isMobile || isOnMobile() || !mediumDesktop ? medium : mediumDesktop;
    const src = get(currentMedium, 'src');
    const imageSrc = typeof src === 'string' ? src : '';
    const lastUrlParam = /\/([^/]*$)/;
    const croppedImageSrc = imageSrc.replace(lastUrlParam, '/crop-$1');

    return (
        <div className={className}>
            <Paper
                className="paper"
                style={{
                    ...{
                        backgroundImage: `url(${croppedImageSrc}), url(${imageSrc})`,
                        backgroundPosition: 'top',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                    },
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

StoryCover.propTypes = {
    className: PropTypes.string,
    content: PropTypes.string.isRequired,
    medium: PropTypes.shape({
        src: PropTypes.string.isRequired,
    }),
    mediumDesktop: PropTypes.shape({
        src: PropTypes.string.isRequired,
    }),
    isMobile: PropTypes.bool,
};

export default glamorous(StoryCover)(styles);
