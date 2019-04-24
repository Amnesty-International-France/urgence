import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import LinkTwitter from './LinkTwitter';
import LinkFacebook from './LinkFacebook';
import LinkWhatsapp from './LinkWhatsapp';
import SharingStep from './SharingStep';
import { black } from '../colors';

const styles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: black,
    '& .list': {
        listStyle: 'none',
    },
};

const parseTextForUrl = (text, auId) => {
    const encodedText = encodeURI(text);
    const hashTaggedText = encodedText.replace(/#/g, '%23');
    return hashTaggedText.replace('$CURRENT_AU_ID', auId);
};

export const Share = ({
    className,
    active_twitter,
    message,
    twitter_message,
    twitter_title,
    auId,
}) => {
    const [twitterDone, setTwitterDone] = useState(false);
    const [shareDone, setShareDone] = useState(false);

    const text = parseTextForUrl(message, auId);

    const handleTwitterDone = () => {
        setTwitterDone(true);
    };

    const handleShareDone = () => {
        setShareDone(true);
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
            <SharingStep text="Activer votre réseau" done={shareDone} />
            <ul className="list">
                <li>
                    <LinkFacebook text={text} action={handleShareDone} />
                </li>
                <li>
                    <LinkWhatsapp text={text} action={handleShareDone} />
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
