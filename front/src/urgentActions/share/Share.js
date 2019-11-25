import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import get from 'lodash.get';

import RichText from '../../themes/RichText';
import LongText from '../../themes/LongText';
import ShareForm from '../../themes/Sharing/ShareForm';

import generateUrl from '../../services/generateUrl';

const styles = {
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: '18px',
    '& .header': {
        margin: '0.5em 0',
    },
    '& h1': {
        fontFamily: 'Amnesty Trade Gothic Condensed',
        fontSize: '30px',
        lineHeight: '30px',
        textTransform: 'uppercase',
    },
    '& .text': {
        margin: '0.5em 0',
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
        <div className={className}>
            <div className="header">
                <h1>
                    <LongText text={title} />
                </h1>
                {text && (
                    <div className="text">
                        <RichText html={text} />
                    </div>
                )}
            </div>
            <ShareForm
                {...share}
                slug={slug}
                step={step}
                link={link}
                analyticsCategory={analyticsCategory}
            />
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

export default glamorous(Share)(styles);
