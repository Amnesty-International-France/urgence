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
        marginLeft: 25,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    '& .link': {
        display: 'flex',
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

export const ShareForm = ({
    className,
    slug,
    step,
    link,
    active_twitter,
    message,
    twitter_message,
    twitter_title,
    registered,
    analyticsCategory,
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
                        slug={slug}
                        step={step}
                        text={encodeURIComponent(twitter_message)}
                        action={handleTwitterDone}
                        analyticsCategory={analyticsCategory}
                    />
                </Fragment>
            )}
            <SharingStep text="Activer votre réseau" done={socialDone} number={stepNumber} />
            <div className="list">
                {md.mobile() && (
                    <Fragment>
                        <div className="link">
                            <LinkFacebook
                                slug={slug}
                                step={step}
                                url={encodeURIComponent(link)}
                                action={handleSocialDone}
                                analyticsCategory={analyticsCategory}
                            />
                        </div>
                        <div className="link">
                            <LinkWhatsapp
                                slug={slug}
                                step={step}
                                text={encodeURIComponent(`${message}\n${link}`)}
                                action={handleSocialDone}
                                analyticsCategory={analyticsCategory}
                            />
                        </div>
                    </Fragment>
                )}
                <div className="link">
                    <CopyToClipboard
                        slug={slug}
                        step={step}
                        url={link}
                        action={handleSocialDone}
                        analyticsCategory={analyticsCategory}
                    />
                </div>
            </div>
            {false && (
                // Commenting this out for now since there are no RGPD disclaimers yet
                // Can't use comment because linter is strict
                <SharingStep
                    text={`${
                        registerDone ? 'Vous êtes déjà inscrit' : 'Recevoir les prochaines actions'
                    }`}
                    done={registerDone}
                    number={stepNumber + 1}
                />
            )}
            {false && (
                <ToUrgentActionPageLink
                    label={
                        <Fragment>
                            <FontAwesomeIcon icon={faUserEdit} size="2x" className="icon" />
                            <span>{`${registerDone ? 'Modifier' : `S'inscrire`}`}</span>
                        </Fragment>
                    }
                    step={step}
                    pageName="register"
                    analyticsCategory={analyticsCategory}
                    buttonName="ToRegister"
                    whiteLink={true}
                    onClick={handleRegisterDone}
                />
            )}
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
