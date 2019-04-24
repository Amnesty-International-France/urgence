import React, { Fragment } from 'react';
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
    const text = parseTextForUrl(message, auId);

    return (
        <div className={className}>
            {active_twitter && (
                <Fragment>
                    <SharingStep text={twitter_title} done={false} />
                    <LinkTwitter text={parseTextForUrl(twitter_message, auId)} />
                </Fragment>
            )}
            <SharingStep text="Activez votre réseau" done={true} />
            <ul className="list">
                <li>
                    <LinkFacebook text={text} />
                </li>
                <li>
                    <LinkWhatsapp text={text} />
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
};

Share.defaultProps = {
    message: '',
    auId: '',
};

export default glamorous(Share)(styles);
