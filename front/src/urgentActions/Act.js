import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import RichText from '../themes/RichText';
import { yellow, white } from '../themes/colors';
import { withBlackLogo } from '../themes/ThemeContext';
import { LinkType } from '../propTypes';
import Link from './Link';

export const Act = ({ callToAction, className, action }) => (
    <div className={className}>
        <div>
            <h1>{get(callToAction, 'title')}</h1>
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

export default glamorous(withBlackLogo(Act))({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: yellow,
    color: white,
    height: '100%',
    '@media (min-width: 1024px)': {
        padding: '10vh 10vw',
        '& .link': {
            textAlign: 'center',
        },
    },
    '& h1': {
        fontFamily: 'Amnesty Trade Gothic Condensed',
        padding: '2rem 3rem',
        textAlign: 'center',
        fontSize: '56px',
        fontWeight: 'bold',
    },
    '& .rich-text': {
        margin: '22px 31px',
        textAlign: 'center',
        fontSize: '28px',
        lineHeight: '33px',
        fontWeight: 'bold',
    },
    '& .actions': {
        textAlign: 'center',
    },
    '& a': {
        margin: '0 1rem 1rem 1rem',
    },
});
