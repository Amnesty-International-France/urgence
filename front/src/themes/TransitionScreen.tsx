import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { black, RichText, yellow } from 'amnesty-components';
import LongText from './LongText';

import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router';
import { compose } from 'recompose';
import permanentData from '../data/permanentData';
import { withSessionData } from '../DataContext';
import { secureUseEffect, secureUseState } from '../hooks/secureHooks';
import { addCampaignMemberTwitter, addResponseCount } from '../services/api';
import generateUrl from '../services/generateUrl';
import LinkTwitter from './Sharing/LinkTwitter';
import PaperForMobile from '../urgentActions/layout/PaperForMobile';

const styles = {
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: '18px',
    margin: '60px 15px 15px',
    '& .paper': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '300px',
        color: black,
        backgroundColor: yellow,
        '@media (min-width: 1024px)': {
            height: '85vh',
        },
    },

    '& h1': {
        fontFamily: 'Amnesty Trade Gothic Condensed',
        fontSize: '30px',
        color: black,
        textTransform: 'uppercase',
        lineHeight: '30px',
    },
    '& .rich-text': {
        color: black,
    },
    '& .text': {
        margin: '0.5em 0',
    },
    '& .social-media': {
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'center',
    },
    '& .actions': {
        fontFamily: 'Amnesty Trade Gothic Condensed',
        fontWeight: 'bold',
        fontSize: '26px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px 15px',
        marginTop: '-30px',
        height: '60px',
        '& a': {
            width: '100%',
        },
    },
    '@media (min-width: 1024px)': {
        fontSize: '24px',
        '& .link': {
            textAlign: 'center',
        },
        '& .actions': {
            '& a': {
                width: 'fit-content',
            },
        },
    },
};

export const TransitionScreen = ({
    registered,
    className,
    actions,
    title,
    message,
    progress,
    responseCount,
    interpelationMode,
    twitterAction,
    auId,
}: any) => {
    const [displayProgress, setDisplayProgress] = secureUseState(false);
    const firstname = permanentData.getFirstname();
    const lastname = permanentData.getLastname();
    const email = permanentData.getEmail();
    const civility = permanentData.getCivility();
    const phone = permanentData.getPhone();
    const { slug } = useParams();
    const navigate = useNavigate();

    secureUseEffect(() => {
        if (
            !progress ||
            !progress.display ||
            !progress.objective ||
            !progress.message ||
            !responseCount ||
            responseCount < progress.display_threshold
        ) {
            // @ts-expect-error TS(2349): This expression is not callable.
            setDisplayProgress(false);
            return;
        }
        // @ts-expect-error TS(2349): This expression is not callable.
        setDisplayProgress(true);
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
    }, [progress]);

    const textToHtml = (str: any) => (str ? str.replace(/(?:\r\n|\r|\n)/g, '<br/>') : '');
    const formatText = (text: any) => {
        if (!text) {
            return '';
        }
        text = text.replace('{{count}}', responseCount);
        text = text.replace('{{objective}}', progress.objective);
        return text;
    };

    const getTwitterText = () => {
        if (!twitterAction) {
            return '';
        }

        let twitterText = `${twitterAction.title} - ${twitterAction.message}`;
        twitterAction.url && (twitterText += `&url=${encodeURIComponent(twitterAction.url)}`);
        twitterAction.hashtags && (twitterText += `&hashtags=${twitterAction.hashtags}`);
        return twitterText;
    };

    const addTwitterMember = () => {
        addResponseCount(auId);
        if (registered || (firstname && lastname)) {
            addCampaignMemberTwitter(auId, {
                firstname,
                lastname,
                email,
                civility,
                phone,
            })
                .then((result) => {
                    if (result.errors && result.errors.length) {
                        // eslint-disable-next-line no-console
                        console.log(
                            'Failed adding campaign member twitter',
                            result.errors.map((error: any) => `- ${error.message}`).join('\n'),
                        );
                    }
                })
                .catch(() => {});
        }
        navigate(generateUrl(urlToRedirect, slug));
    };

    const urlToRedirect = registered ? 'share' : 'register';
    return (
        <div className={className}>
            <PaperForMobile elevation={4} className={'paper'}>
                <div className="step">
                    {displayProgress && (
                        <div className="progress">
                            <div className="progressChart">
                                <CircularProgressbarWithChildren
                                    value={responseCount}
                                    maxValue={progress.objective}
                                    background
                                    backgroundPadding={1}
                                    styles={buildStyles({
                                        backgroundColor: black,
                                        textColor: 'red',
                                        pathColor: 'black',
                                        trailColor: yellow,
                                        strokeLinecap: 'butt',
                                    })}
                                >
                                    <div className={'progress-info'}>
                                        <div
                                            className="progressChartContent"
                                            dangerouslySetInnerHTML={{
                                                __html: textToHtml(formatText(progress.message)),
                                            }}
                                        ></div>
                                    </div>
                                </CircularProgressbarWithChildren>
                            </div>
                        </div>
                    )}
                    <h1>
                        <LongText text={title} />
                    </h1>
                    {message && (
                        <div className="text">
                            <RichText html={message} />
                        </div>
                    )}
                    {interpelationMode === 'rs' && (
                        <div className="social-media">
                            <LinkTwitter text={getTwitterText()} action={addTwitterMember} />
                        </div>
                    )}
                </div>
            </PaperForMobile>
            {interpelationMode === 'email' && <div className="actions">{actions()}</div>}
        </div>
    );
};

TransitionScreen.propTypes = {
    data: PropTypes.any,
    className: PropTypes.string.isRequired,
    actions: PropTypes.func,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    progress: PropTypes.any,
    responseCount: PropTypes.number,
    interpelationMode: PropTypes.string,
    registered: PropTypes.any,
    twitterAction: PropTypes.shape({
        title: PropTypes.string,
        message: PropTypes.string,
        hashtags: PropTypes.string,
        url: PropTypes.string,
    }),
    auId: PropTypes.string,
};

TransitionScreen.defaultProps = {
    actions: () => {},
    title: '',
    message: '',
};

// @ts-expect-error TS(2769): No overload matches this call.
export default styled(compose(withSessionData)(TransitionScreen))(styles);
