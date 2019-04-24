import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import LinkTwitter from './LinkTwitter';
import LinkFacebook from './LinkFacebook';
import { black } from './colors';

const styles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: black,
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
}) => (
    <div className={className}>
        {active_twitter && (
            <Fragment>
                <span>{twitter_title}</span>
                <LinkTwitter text={parseTextForUrl(twitter_message, auId)} />
            </Fragment>
        )}
        <span>Activez votre réseau</span>
        <LinkFacebook text={parseTextForUrl(message, auId)} />
    </div>
);

Share.propTypes = {
    message: PropTypes.string.isRequired,
    active_twitter: PropTypes.bool,
    twitter_message: PropTypes.string,
    twitter_title: PropTypes.string,
    auId: PropTypes.string.isRequired,
};

Share.defaultProps = {
    message: '',
};

export default glamorous(Share)(styles);
