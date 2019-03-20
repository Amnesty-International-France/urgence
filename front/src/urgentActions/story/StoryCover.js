import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { white, black } from '../../themes/colors';
import RichText from '../../themes/RichText';

const styles = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    padding: '100px 20px',
    '@media (min-width: 1024px)': {
        padding: '10vh 10vw',
    },
    '& .step': {
        flex: '1 0 0',
        display: 'flex',
        flexDirection: 'column',
        '@media (min-aspect-ratio: 1/1)': {
            flexDirection: 'row',
        },
    },
    '& .content': {
        flex: '1 0 0',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'auto',
    },
    '& .rich-text > p': {
        textTransform: 'uppercase',
        fontFamily: 'Amnesty Trade Gothic Condensed',
        margin: '0 12px',
        width: 'calc(100% - 24px)',
    },
    '& .ql-size-huge': {
        color: black,
        backgroundColor: white,
        fontSize: '36px',
        padding: '6px 0',
        boxShadow: `12px 0 0 ${white}, -12px 0 0 ${white}`,
        '@media (min-width: 1024px)': {
            fontSize: '72px',
            padding: '12px 0',
        },
    },
    '& .ql-size-large': {
        color: white,
        backgroundColor: black,
        fontSize: '26px',
        padding: '4px 0',
        boxShadow: `12px 0 0 ${black}, -12px 0 0 ${black}`,
        '@media (min-width: 1024px)': {
            fontSize: '52px',
            padding: '8px 0',
        },
    },
};

export const StoryCover = ({ className, content }) => (
    <div className={className}>
        <div className="step">
            <div className="content">
                <RichText html={content} />
            </div>
        </div>
    </div>
);

StoryCover.propTypes = {
    className: PropTypes.string,
    content: PropTypes.string.isRequired,
};

export default glamorous(StoryCover)(styles);
