import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import LinkTwitter from './LinkTwitter';
import LinkFacebook from './LinkFacebook';
import CopyToClipboard from './CopyToClipboard';
import { black } from '../colors';

import { withSessionData } from '../../DataContext';

const styles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: black,
    paddingBottom: '20px',
    '& .share': {
        textAlign: 'center',
        paddingBottom: '10px',
    },
    '& .share-text': {
        paddingBottom: '20px',
    },
    '& .list': {
        display: 'flex',
        marginLeft: 25,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    '& .link': {
        display: 'flex',
    },
    '& .content': {
        fontSize: 12,
        fontFamily: 'Amnesty Trade Gothic LT',
        alignSelf: 'center',
        marginBottom: 10,
    },
    '& .icon': {
        height: 30,
        marginRight: 10,
    },
    '& .links': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
};

export const ShareForm = ({ className, slug, step, link, twitter_message, analyticsCategory }) => {
    return (
        <div className={className}>
            <div className="share">
                <div className="share-text">Partagez l&apos;URL avec vos proches</div>
                <CopyToClipboard
                    slug={slug}
                    step={step}
                    url={link}
                    analyticsCategory={analyticsCategory}
                />
            </div>
            <div className="share">
                <div>Ou utilisez vos réseaux sociaux favoris</div>
                <div className="links">
                    <LinkFacebook
                        slug={slug}
                        step={step}
                        url={encodeURIComponent(link)}
                        analyticsCategory={analyticsCategory}
                    />

                    <LinkTwitter
                        slug={slug}
                        step={step}
                        text={encodeURIComponent(twitter_message)}
                        analyticsCategory={analyticsCategory}
                    />
                </div>
            </div>
        </div>
    );
};

ShareForm.propTypes = {
    slug: PropTypes.string,
    step: PropTypes.string,
    link: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    registered: PropTypes.string,
    active_twitter: PropTypes.bool,
    twitter_message: PropTypes.string,
    twitter_title: PropTypes.string,
    analyticsCategory: PropTypes.string,
    className: PropTypes.string,
};

ShareForm.defaultProps = {
    registered: false,
    message: '',
    auId: '',
};

export default glamorous(withSessionData(ShareForm))(styles);
