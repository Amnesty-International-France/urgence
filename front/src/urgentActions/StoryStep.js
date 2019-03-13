import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import RichText from '../themes/RichText';
import Image from '../themes/Image';
import { StoryStepPropType, LinkType } from '../propTypes';
import { textColorForBackgroundColor, colors, black, white, yellow } from '../themes/colors';
import Link from './Link';

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
        overflow: 'auto',
    },

    '& .act': {
        flex: '0 0 3rem',
        margin: '1rem 1rem 0 1rem',
        '@media (min-width: 1024px)': {
            textAlign: 'right',
        },
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

export const StoryStep = ({ className, medium, displayOptions, content, link }) => (
    <div
        className={className}
        style={{
            backgroundColor: colors[displayOptions.backgroundColor],
            color: textColorForBackgroundColor(displayOptions.backgroundColor),
        }}
    >
        <div className="step">
            {medium && displayOptions.mediumPosition === 'top' && (
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

            {medium && displayOptions.mediumPosition === 'bottom' && (
                <div className="image">
                    <Image {...medium} />
                </div>
            )}
        </div>

        {link && link.url && (
            <Link {...link} color={textColorForBackgroundColor(displayOptions.backgroundColor)} />
        )}
    </div>
);

StoryStep.propTypes = {
    className: PropTypes.string,
    link: LinkType,
    ...StoryStepPropType,
};

export default glamorous(StoryStep)(styles);
