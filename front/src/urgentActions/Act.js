import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import RichText from '../themes/RichText';
import { yellow, white, black } from '../themes/colors';
import { withBlackLogo } from '../themes/ThemeContext';
import { LinkType } from '../propTypes';
import Link from './Link';

const styles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    padding: '1rem',
    color: white,
    backgroundColor: yellow,
    fontFamily: 'Amnesty Trade Gothic',
    '@media (min-width: 1024px)': {
        padding: '10vh 10vw',
        '& .link': {
            textAlign: 'center',
        },
    },
    '& h1': {
        textTransform: 'uppercase',
        fontSize: '2rem',
        fontWeight: 'bold',
        margin: '2rem 0.5rem',
        width: 'calc(100% - 0.5rem)',
    },
    '& span': {
        color: white,
        backgroundColor: black,
        padding: '0.7rem 0',
        boxShadow: `0.5rem 0 0 ${black}, -0.5rem 0 0 ${black}`,
    },
    '& .rich-text': {
        color: black,
        fontSize: '1rem',
    },
    '& .actions': {
        margin: '2rem 0',
        '& a': {
            display: 'inline-block',
            color: yellow,
            backgroundColor: black,
            height: 40,
        },
    },
};

export const Act = ({ callToAction, className, action }) => (
    <div className={className}>
        <div>
            <h1>
                <span>{get(callToAction, 'title')}</span>
            </h1>
            <RichText html={get(callToAction, 'message')} />
        </div>
        <div className="actions">
            {action}
            {get(callToAction, 'link.url') && <Link {...callToAction.link} color={white} />}
        </div>
    </div>
);

Act.propTypes = {
    action: PropTypes.element,
    callToAction: PropTypes.shape({
        title: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        link: LinkType,
    }),
    className: PropTypes.string.isRequired,
};

export default glamorous(withBlackLogo(Act))(styles);
