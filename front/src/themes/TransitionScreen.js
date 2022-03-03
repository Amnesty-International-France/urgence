import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Paper from '@material-ui/core/Paper';

import RichText from '../themes/RichText';
import LongText from '../themes/LongText';
import { yellow, black } from '../themes/colors';

import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { secureUseEffect, secureUseState } from '../hooks/secureHooks';
import LinkTwitter from './Sharing/LinkTwitter';
import generateUrl from '../services/generateUrl';
import { withRouter } from 'react-router';
import { routeMatch } from '../propTypes';
import { withSessionData } from '../DataContext';
import { compose } from 'recompose';
import { addCampaignMemberTwitter } from '../services/api';

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
    '& .progress': {
        marginBottom: '60px',
        display: 'flex',
        justifyContent: 'center',
        '@media (min-width: 350px)': {
            marginBottom: '80px',
        },

        '& .progressChart': {
            width: '250px',
            height: '250px',
        },
        '& .progressChartContent': {
            fontSize: 18,
            paddingLeft: '25px',
            paddingRight: '25px',
            textAlign: 'center',
        },
    },
    '& .step': {
        margin: '100px 20px 60px',
        '@media (min-width: 350px)': {
            margin: '160px 20px 80px',
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
    history,
    interpelationMode,
    twitterAction,
    match: { params: slug },
    auId,
}) => {
    const [displayProgress, setDisplayProgress] = secureUseState(false);
    secureUseEffect(() => {
        if (
            !progress ||
            progress.display == false ||
            !progress.objective ||
            !progress.message ||
            !responseCount
        ) {
            setDisplayProgress(false);
            return;
        }
        setDisplayProgress(true);
    }, [progress]);

    const textToHtml = str => (str ? str.replace(/(?:\r\n|\r|\n)/g, '<br/>') : '');
    const formatText = text => {
        if (!text) {
            return '';
        }
        text = text.replace('{{count}}', responseCount);
        text = text.replace('{{objective}}', progress.objective);
        return text;
    };

    const getTwitterText = () => {
        let twitterText = `${twitterAction.title} - ${twitterAction.message}`;
        twitterAction.url && (twitterText += `&url=${encodeURIComponent(twitterAction.url)}`);
        twitterAction.hashtags && (twitterText += `&hashtags=${twitterAction.hashtags}`);
        return twitterText;
    };

    const addTwitterMember = () => {
        return addCampaignMemberTwitter(auId)
            .then(result => {
                if (result.errors && result.errors.length) {
                    // eslint-disable-next-line no-console
                    console.log(
                        'Failed adding campaign member twitter',
                        result.errors.map(error => `- ${error.message}`).join('\n'),
                    );
                }
            })
            .catch(() => {})
            .then(() => {
                history.push(generateUrl(urlToRedirect, slug));
            });
    };

    const urlToRedirect = registered ? 'share' : 'register';
    return (
        <div className={className}>
            <Paper className="paper" elevation={4} square>
                <div className="step">
                    {displayProgress && (
                        <div className="progress">
                            <div className="progressChart">
                                <CircularProgressbarWithChildren
                                    value={responseCount}
                                    maxValue={progress.objective}
                                    styles={buildStyles({
                                        pathColor: '#ef8200',
                                        strokeLinecap: 'butt',
                                    })}
                                >
                                    <div
                                        className="progressChartContent"
                                        dangerouslySetInnerHTML={{
                                            __html: textToHtml(formatText(progress.message)),
                                        }}
                                    ></div>
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
            </Paper>
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
    history: PropTypes.any,
    match: routeMatch,
    registered: PropTypes.any,
    twitterAction: PropTypes.shape({
        title: PropTypes.string,
        message: PropTypes.string,
        hashtags: PropTypes.string,
        url: PropTypes.string,
    }),
    auId: PropTypes.number,
};

TransitionScreen.defaultProps = {
    actions: () => {},
    title: '',
    message: '',
};

export default glamorous(compose(withSessionData, withRouter)(TransitionScreen))(styles);
