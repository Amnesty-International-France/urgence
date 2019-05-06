import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import RichText from '../../themes/RichText';
import { StoryStepPropType, LinkType } from '../../propTypes';
import { colors, black, white, yellow } from '../../themes/colors';

const styles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    color: black,
    backgroundColor: white,
    '& .step': {
        flex: '1 0 0',
        display: 'flex',
        flexDirection: 'column',
        padding: '100px 20px',
        '@media (min-aspect-ratio: 1/1)': {
            flexDirection: 'row',
            padding: '10vh 10vw',
        },
    },
    '& .content': {
        display: 'flex',
        flex: '1 0 0',
        alignItems: 'center',
        paddingBottom: 0,
    },
    '& .rich-text > p': {
        fontFamily: 'Amnesty Trade Gothic',
        margin: '0 12px',
        width: 'calc(100% - 24px)',
        fontSize: '16px',
        '@media (min-width: 1024px)': {
            fontSize: '24px',
        },
    },
};

export const getLogoColorForStep = step => {
    const backgroundColor = colors[get(step, 'displayOptions.backgroundColor')];
    if (step.medium && get(step, 'displayOptions.mediumPosition') === 'top') {
        return white;
    }

    if (backgroundColor === yellow || backgroundColor === white) {
        return black;
    }

    return white;
};

export const StoryStep = ({ className, content }) => (
    <div className={className}>
        <div className="step">
            <div className="content">
                <RichText html={content} />
            </div>
        </div>
    </div>
);
StoryStep.propTypes = {
    className: PropTypes.string,
    link: LinkType,
    ...StoryStepPropType,
};

export default glamorous(StoryStep)(styles);
