import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import MobileDetect from 'mobile-detect';
import LinkTwitter from './LinkTwitter';
import LinkFacebook from './LinkFacebook';
import LinkWhatsapp from './LinkWhatsapp';
import CopyToClipboard from './CopyToClipboard';
import SharingStep from './SharingStep';
import ToUrgentActionPageLink from '../../urgentActions/ToUrgentActionPageLink';
import { black } from '../colors';

import { secureUseState } from '../../hooks/secureHooks';

const styles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: black,
    '& .list': {
        listStyle: 'none',
        marginLeft: 20,
    },
    '& .content': {
        fontSize: 16,
        fontFamily: 'Amnesty Trade Gothic LT',
        alignSelf: 'center',
        marginBottom: 10,
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

export const Share = ({
    className,
    active_twitter,
    message,
    twitter_message,
    twitter_title,
    auId,
}) => {
    const md = new MobileDetect(navigator.userAgent);

    const [twitterDone, setTwitterDone] = secureUseState();
    const [socialDone, setSocialDone] = secureUseState();
    const [registerDone, setRegisterDone] = secureUseState();

    const text = parseTextForUrl(message, auId);

    const url = encodeURI(`${global.origin}/#/ua/${auId}`);

    const handleTwitterDone = () => {
        setTwitterDone(true);
    };

    const handleSocialDone = () => {
        setSocialDone(true);
    };

    const handleRegisterDone = () => {
        setRegisterDone(true);
    };
    return (
        <div className={className}>
            <SharingStep text="Participer à l'action urgente" done={true} />
            <span className="content">Merci pour votre participation</span>
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
                {md.mobile() && (
                    <Fragment>
                        <li>
                            <LinkFacebook
                                url={`${global.origin}/#/ua/${auId}`}
                                action={handleSocialDone}
                            />
                        </li>
                        <li>
                            <LinkWhatsapp text={text} action={handleSocialDone} />
                        </li>
                    </Fragment>
                )}
                <li>
                    <CopyToClipboard url={url} action={handleSocialDone} />
                </li>
            </ul>
            <SharingStep text="S'incrire aux Actions Urgentes" done={registerDone} />
            <ToUrgentActionPageLink
                label="S'inscrire"
                step="thanks"
                pageName="register"
                analyticsCategory={'Share'}
                buttonName="ToRegister"
            />
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
