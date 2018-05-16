import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import RichText from '../themes/RichText';
import Image from '../themes/Image';
import ActButton from './ActButton';
import { StoryStepPropType } from '../propTypes';
import { textColorForBackgroundColor } from '../themes/colors';

const styles = {
    '&': {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
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
        padding: '21px 38px 0 24px',
    },
};

export const StoryStep = ({
    className,
    medium,
    displayOptions,
    content,
    hasActButton,
}) => (
    <div
        className={className}
        style={{
            backgroundColor: displayOptions.backgroundColor,
            color: textColorForBackgroundColor(displayOptions.backgroundColor),
        }}
    >
        {medium && displayOptions.mediumPosition === 'top' && (
            <div className="image">
                <Image {...medium} />
            </div>
        )}

        <div
            className="content"
            style={{
                alignItems: !medium ? 'center' : null,
            }}
        >
            <RichText html={content} />
        </div>

        {hasActButton && <ActButton />}

        {medium && displayOptions.mediumPosition === 'bottom' && (
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
