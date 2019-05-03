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

export const Share = ({
    className,
    link,
    active_twitter,
    message,
    twitter_message,
    twitter_title,
    registered,
}) => {
    const md = new MobileDetect(navigator.userAgent);

    const [twitterDone, setTwitterDone] = secureUseState();
    const [socialDone, setSocialDone] = secureUseState();
    const [registerDone, setRegisterDone] = secureUseState(registered === 'true');

    const handleTwitterDone = () => {
        setTwitterDone(true);
    };

    const handleSocialDone = () => {
        setSocialDone(true);
    };

    const handleRegisterDone = () => {
        setRegisterDone(true);
    };

    let stepNumber = active_twitter ? 3 : 2;

    return (
        <div className={className}>
            <SharingStep text="Participer à l'action urgente" done={true} number={1} />
            {active_twitter && (
                <Fragment>
                    <SharingStep text={twitter_title} done={twitterDone} number={2} />
                    <LinkTwitter
                        text={encodeURIComponent(twitter_message)}
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
                                url={encodeURIComponent(link)}
                                action={handleSocialDone}
                            />
                        </div>
                        <div className="link">
                            <LinkWhatsapp
                                text={encodeURIComponent(`${message}\n${link}`)}
                                action={handleSocialDone}
                            />
                        </div>
                    </Fragment>
                )}
                <div className="link">
                    <CopyToClipboard url={link} action={handleSocialDone} />
                </div>
            </div>
            <SharingStep
                text="S'inscrire aux Actions Urgentes"
                done={registerDone}
                number={stepNumber + 1}
            />
            <ToUrgentActionPageLink
                label={
                    <Fragment>
                        <FontAwesomeIcon icon={faUserEdit} size="2x" className="icon" />
                        <span>{`${registerDone ? `Se réinscrire` : `S'inscrire`}`}</span>
                    </Fragment>
                }
                step="thanks"
                pageName="register"
                analyticsCategory={'Share'}
                buttonName="ToRegister"
                whiteLink={true}
                onClick={handleRegisterDone}
            />
        </div>
    );
};

Share.propTypes = {
    link: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    registered: PropTypes.string,
    active_twitter: PropTypes.bool,
    twitter_message: PropTypes.string,
    twitter_title: PropTypes.string,
    className: PropTypes.string,
};

Share.defaultProps = {
    registered: false,
    message: '',
    auId: '',
};

export default glamorous(withSessionData(Share))(styles);
