import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import LinkFacebook from './LinkFacebook';
import LinkTwitter from './LinkTwitter';
import LinkWhatsapp from './LinkWhatsapp';
import CopyToClipboard from './CopyToClipboard';
import { black } from '../colors';

import { withSessionData } from '../../DataContext';

const styles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: black,
    '& .share-block': {
        textAlign: 'center',
        padding: '0.5em 0',
    },
    '& .share-text': {
        padding: '0.5em 0',
    },
    '& .share-links': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: '0.5em 0',
        '& a': {
            margin: '0 0.5em',
        },
    },
};

export const ShareForm = ({ className, slug, step, link, twitter_message, analyticsCategory }) => {
    return (
        <div className={className}>
            <div className="share-block">
                <div className="share-text">Partagez l&apos;URL avec vos proches</div>
                <CopyToClipboard
                    slug={slug}
                    step={step}
                    url={link}
                    analyticsCategory={analyticsCategory}
                />
            </div>
            <div className="share-block">
                <div>Ou utilisez vos réseaux sociaux favoris</div>
                <div className="share-links">
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
                    <LinkWhatsapp
                        slug={slug}
                        step={step}
                        text={encodeURIComponent(link)}
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
