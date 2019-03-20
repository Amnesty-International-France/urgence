import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import RichText from '../../themes/RichText';
import Image from '../../themes/Image';
import { StoryStepPropType, LinkType } from '../../propTypes';
import { textColorForBackgroundColor, colors, black, white, yellow } from '../../themes/colors';
import Link from '../Link';

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
    '& .image': {
        flex: '1 0 0',
    },
    '& .image > div': {
        height: '100%',
    },
    '& .content': {
        display: 'flex',
        flex: '1 0 0',
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
