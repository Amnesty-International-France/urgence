import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import glamorous from 'glamorous';
import { compose } from 'recompose';
import { Paper } from '@material-ui/core';
import get from 'lodash.get';

import RichText from '../../themes/RichText';
import LongText from '../../themes/LongText';
import { white, black } from '../../themes/colors';
import { withYellowLogo, withYellowBackground } from '../../themes/ThemeContext';
import ShareForm from '../../themes/Sharing/ShareForm';

import generateUrl from '../../services/generateUrl';

const styles = {
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: '0.8em',
    padding: '60px 15px 20px',
    '& .paper': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: '100%',
        width: '100%',
        padding: '135px 20px 20px 20px',
        color: black,
        backgroundColor: white,
    },
    '& .header': {
        margin: '1em 0',
    },
    '& h1': {
        fontFamily: 'Amnesty Trade Gothic Condensed',
        fontSize: '30px',
        lineHeight: '30px',
        textTransform: 'uppercase',
    },
    '@media (min-width: 350px)': {
        fontSize: '16px',
    },
    '@media (min-width: 1024px)': {
        '&.paper': {
            padding: '10vh 10vw',
        },
        '& .link': {
            textAlign: 'center',
        },
    },
};
const getLinkFromSlug = slug => `${global.origin}${generateUrl('ua', { slug })}`;

const Share = ({ className, slug, step, data, analyticsCategory }) => {
    const title = get(data, 'title');
    const text = get(data, 'text');
    const share = get(data, 'share');

    const link = getLinkFromSlug(slug);

    return (
        <div className={classnames('share', className)}>
            <Paper className="paper" elevation={6} square>
                <div className="header">
                    <h1>
                        <LongText text={title} />
                    </h1>
                    {text && <RichText html={text} />}
                </div>
                {share && (
                    <ShareForm
                        {...share}
                        slug={slug}
                        step={step}
                        link={link}
                        analyticsCategory={analyticsCategory}
                    />
                )}
            </Paper>
        </div>
    );
};

Share.propTypes = {
    className: PropTypes.string,
    slug: PropTypes.string.isRequired,
    step: PropTypes.string,
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        share: PropTypes.object,
    }),
    analyticsCategory: PropTypes.string,
};

Share.defaultProps = {
    slug: 'new-ua',
    data: {
        title: '',
        text: '',
        share: {},
    },
};

const WithStylesShare = glamorous(Share)(styles);

export default compose(withYellowLogo, withYellowBackground)(WithStylesShare);
