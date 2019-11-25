import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import get from 'lodash.get';
import Paper from '@material-ui/core/Paper';

import { white, black } from '../../themes/colors';
import RichText from '../../themes/RichText';

const styles = {
    padding: '60px 15px 20px',
    height: '95vh',
    '& .page': {
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 80px)',
        width: '100%',
        paddingBottom: '80px',
    },
    '& .step': {
        flex: '1 0 0',
        display: 'flex',
        flexDirection: 'row',
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

export const StoryCover = ({ className, content, step }) => (
    <div className={className}>
        <Paper
            className="page"
            style={{
                ...{
                    backgroundImage: `url(${get(step, 'medium.src', null)})`,
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

StoryCover.propTypes = {
    className: PropTypes.string,
    content: PropTypes.string.isRequired,
    step: PropTypes.object.isRequired,
};

export default glamorous(StoryCover)(styles);
