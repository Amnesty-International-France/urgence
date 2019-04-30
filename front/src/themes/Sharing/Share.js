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
import { black, grey } from '../colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { withSessionData } from '../../DataContext';

import { secureUseState } from '../../hooks/secureHooks';

const styles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: black,
    borderLeft: `solid 1px ${grey}`,
    marginLeft: 16,
    '& .list': {
        display: 'flex',
        marginLeft: 41,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    '& .link': {
        display: 'flex',
        marginTop: 10,
    },
    '& .content': {
        fontSize: 16,
        fontFamily: 'Amnesty Trade Gothic LT',
        alignSelf: 'center',
        marginBottom: 10,
    },
    '& .icon': {
        height: 30,
        marginRight: 10,
    },
};

const parseTextForUrl = text => {
    const encodedText = encodeURI(text);
    const hashTaggedText = encodedText.replace(/#/g, '%23');
    return hashTaggedText;
};

export const Share = ({
    className,
    active_twitter,
    message,
    twitter_message,
    twitter_title,
    auId,
    registered,
}) => {
    const md = new MobileDetect(navigator.userAgent);

    const [twitterDone, setTwitterDone] = secureUseState();
    const [socialDone, setSocialDone] = secureUseState();
    const [registerDone, setRegisterDone] = secureUseState(registered);

    const url = encodeURI(`${global.origin}/#/ua/${auId}`);

    const handleTwitterDone = () => {
        setTwitterDone(true);
    };

    const handleSocialDone = () => {
        setSocialDone(true);
    };

    const handleRegisterDone = () => {
        setRegisterDone('true');
    };

    let stepNumber = active_twitter ? 3 : 2;

    return (
        <div className={className}>
            <SharingStep text="Participer à l'action urgente" done={true} number={1} />
            {active_twitter && (
                <Fragment>
                    <SharingStep text={twitter_title} done={twitterDone} number={2} />
                    <LinkTwitter
                        text={parseTextForUrl(twitter_message)}
                        action={handleTwitterDone}
                    />
                </Fragment>
            )}
            <SharingStep text="Activer votre réseau" done={socialDone} number={stepNumber} />
            <div className="list">
                {md.mobile() && (
                    <Fragment>
                        <div className="link">
                            <LinkFacebook
                                url={`${global.origin}/#/ua/${auId}`}
                                action={handleSocialDone}
                            />
                        </div>
                        <div className="link">
                            <LinkWhatsapp
                                text={parseTextForUrl(`${message}\n${url}`)}
                                action={handleSocialDone}
                            />
                        </div>
                    </Fragment>
                )}
                <div className="link">
                    <CopyToClipboard url={url} action={handleSocialDone} />
                </div>
            </div>
            <SharingStep
                text="S'incrire aux Actions Urgentes"
                done={registerDone === 'true'}
                number={stepNumber + 1}
            />
            <ToUrgentActionPageLink
                label={
                    <Fragment>
                        <FontAwesomeIcon icon={faUserEdit} size="2x" className="icon" />
                        <span>{`S'inscrire`}</span>
                    </Fragment>
                }
                step="thanks"
                pageName="register"
                analyticsCategory={'Share'}
                buttonName="ToRegister"
                whiteLink={true}
                onClick={handleRegisterDone}
                disabled={registerDone === 'true'}
            />
        </div>
    );
};

Share.propTypes = {
    message: PropTypes.string.isRequired,
    registered: PropTypes.string,
    active_twitter: PropTypes.bool,
    twitter_message: PropTypes.string,
    twitter_title: PropTypes.string,
    auId: PropTypes.string.isRequired,
    className: PropTypes.string,
};

Share.defaultProps = {
    registered: false,
    message: '',
    auId: '',
};

export default glamorous(withSessionData(Share))(styles);
