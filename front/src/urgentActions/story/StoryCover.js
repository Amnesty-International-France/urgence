import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { white, black } from '../../themes/colors';
import RichText from '../../themes/RichText';

const styles = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
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
        padding: '21px 38px 21px 24px',
        overflow: 'auto',
    },
    '& .rich-text > p': {
        textTransform: 'uppercase',
        fontFamily: 'Amnesty Trade Gothic Condensed',
    },
    '& .ql-size-huge': {
        color: black,
        backgroundColor: white,
        fontSize: '36px',
        padding: '6px 0',
        boxShadow: `12px 0 0 ${white}, -12px 0 0 ${white}`,
    },
    '& .ql-size-large': {
        color: white,
        backgroundColor: black,
        fontSize: '26px',
        padding: '4px 0',
        boxShadow: `12px 0 0 ${black}, -12px 0 0 ${black}`,
    },
};

export const StoryCover = ({ className, content }) => (
    <div className={className}>
        <div className="step">
            <div className="content" style={{}}>
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
