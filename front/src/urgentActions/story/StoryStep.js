import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Paper from '@material-ui/core/Paper';

import RichText from '../../themes/RichText';
import { StoryStepPropType } from '../../propTypes';
import { black, white } from '../../themes/colors';

const styles = {
    position: 'relative',
    margin: '60px 15px 15px',
    '& .paper': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '70vh',
        color: black,
        backgroundColor: white,
        '@media (min-width: 1024px)': {
            height: '85vh',
        },
    },
    '& .step': {
        margin: '160px 20px 90px',
    },
    '& .content': {
        display: 'flex',
        flex: '1 0 0',
        alignItems: 'center',
    },
    '& .rich-text > p': {
        fontFamily: 'Amnesty Trade Gothic',
        margin: '0 12px',
        width: 'calc(100% - 24px)',
        fontSize: '18px',
    },
    '@media (min-width: 1024px)': {
        fontSize: '24px',
        '& .rich-text > p': {
            fontSize: '24px',
        },
    },
};

export const StoryStep = ({ className, content }) => (
    <div className={className}>
        <Paper className="paper" elevation={6} square>
            <div className="step">
                <div className="content">
                    <RichText html={content} />
                </div>
            </div>
        </Paper>
    </div>
);

StoryStep.propTypes = {
    className: PropTypes.string,
    ...StoryStepPropType,
};

export default glamorous(StoryStep)(styles);
