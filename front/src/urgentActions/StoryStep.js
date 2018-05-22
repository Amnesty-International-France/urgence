import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import RichText from '../themes/RichText';
import Image from '../themes/Image';
import ActButton from './ActButton';
import { StoryStepPropType } from '../propTypes';
import { textColorForBackgroundColor, colors, black, white, yellow } from '../themes/colors';

const styles = {
    '&': {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        '@media (min-aspect-ratio: 1/1)': {
            flexDirection: 'row',
        },
    },

    '& .image': {
        flex: '1 0 0',
    },

    '& .image > div': {
        height: '100%',
    },

    '& .content': {
        display: 'flex',
        flex: '1 0 0',
        padding: '21px 38px 21px 24px',
    },
};

const contentAlignment = (medium, displayOptions) =>
    !medium ? 'center' : displayOptions.mediumPosition === 'bottom' ? 'flex-end' : null;

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

export const StoryStep = ({ className, medium, displayOptions, content, hasActButton }) => (
    <div
        className={className}
        style={{
            backgroundColor: colors[displayOptions.backgroundColor],
            color: textColorForBackgroundColor(displayOptions.backgroundColor),
        }}
    >
        {medium &&
            displayOptions.mediumPosition === 'top' && (
                <div className="image">
                    <Image {...medium} />
                </div>
            )}

        <div
            className="content"
            style={{
                alignItems: contentAlignment(medium, displayOptions),
                paddingBottom: displayOptions.mediumPosition === 'bottom' ? 21 : 0,
            }}
        >
            <RichText html={content} />
        </div>

        {hasActButton && <ActButton />}

        {medium &&
            displayOptions.mediumPosition === 'bottom' && (
                <div className="image">
                    <Image {...medium} />
                </div>
            )}
    </div>
);

StoryStep.propTypes = {
    className: PropTypes.string,
    hasActButton: PropTypes.bool,
    ...StoryStepPropType,
};

export default glamorous(StoryStep)(styles);
