import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Paper from '@material-ui/core/Paper';

import RichText from '../../themes/RichText';
import { StoryStepPropType } from '../../propTypes';
import { black, white } from '../../themes/colors';

const styles = {
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: '18px',
    padding: '60px 15px 20px',
    height: '95vh',
    '& .page': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        width: 'calc(100% - 40px)',
        padding: '0px 20px',
        color: black,
        backgroundColor: white,
    },
    '& .step': {
        flex: '1 0 0',
        display: 'flex',
        flexDirection: 'column',
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
        <Paper className="page" elevation={6} square>
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
