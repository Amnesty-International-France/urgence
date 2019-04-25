import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import MobileDetect from 'mobile-detect';
import LinkTwitter from './LinkTwitter';
import LinkFacebook from './LinkFacebook';
import LinkWhatsapp from './LinkWhatsapp';
import CopyToClipboard from './CopyToClipboard';
import SharingStep from './SharingStep';
import { black } from '../colors';

const styles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: black,
    '& .list': {
        listStyle: 'none',
        marginLeft: 20,
    },
    '& .twitter-share-button': {
        '@media (min-width: 1024px)': {
            alignSelf: 'start',
            marginLeft: 20,
        },
    },
};

const parseTextForUrl = (text, auId) => {
    const encodedText = encodeURI(text);
    const hashTaggedText = encodedText.replace(/#/g, '%23');
    return hashTaggedText.replace('$CURRENT_AU_ID', auId);
};

const setUseStateForAdmin = () => {
    try {
        return useState(false);
    } catch (error) {
        console.log("useState doesn't work through admin preview");
        console.log(error.message);
        return [false, () => true];
    }
};

export const Share = ({
    className,
    active_twitter,
    message,
    twitter_message,
    twitter_title,
    auId,
}) => {
    const md = new MobileDetect(navigator.userAgent);

    const [twitterDone, setTwitterDone] = setUseStateForAdmin();
    const [socialDone, setSocialDone] = setUseStateForAdmin();

    const text = parseTextForUrl(message, auId);

    const url = encodeURI(`${global.origin}/#/ua/${auId}`);

    const handleTwitterDone = () => {
        setTwitterDone(true);
    };

    const handleSocialDone = () => {
        setSocialDone(true);
    };
    return (
        <div className={className}>
            {active_twitter && (
                <Fragment>
                    <SharingStep text={twitter_title} done={twitterDone} />
                    <LinkTwitter
                        text={parseTextForUrl(twitter_message, auId)}
                        action={handleTwitterDone}
                    />
                </Fragment>
            )}
            <SharingStep text="Activer votre réseau" done={socialDone} />
            <ul className="list">
                <li>
                    <LinkFacebook url={url} action={handleSocialDone} />
                </li>
                {md.mobile() && (
                    <li>
                        <LinkWhatsapp text={text} action={handleSocialDone} />
                    </li>
                )}
                <li>
                    <CopyToClipboard url={url} action={handleSocialDone} />
                </li>
            </ul>
        </div>
    );
};

Share.propTypes = {
    message: PropTypes.string.isRequired,
    active_twitter: PropTypes.bool,
    twitter_message: PropTypes.string,
    twitter_title: PropTypes.string,
    auId: PropTypes.string.isRequired,
    className: PropTypes.string,
};

Share.defaultProps = {
    message: '',
    auId: '',
};

export default glamorous(Share)(styles);
