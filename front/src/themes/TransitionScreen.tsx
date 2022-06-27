import styled from '@emotion/styled';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

import { black, yellow } from './colors';
import LongText from './LongText';
import RichText from './RichText';

import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reco... Remove this comment to see the full error message
import { compose } from 'recompose';
import permanentData from '../data/permanentData';
import { withSessionData } from '../DataContext';
import { secureUseEffect, secureUseState } from '../hooks/secureHooks';
import { addCampaignMemberTwitter, addResponseCount } from '../services/api';
import generateUrl from '../services/generateUrl';
import LinkTwitter from './Sharing/LinkTwitter';

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
            progress.display == false ||
            !progress.objective ||
            !progress.message ||
            !responseCount ||
            !responseCount < progress.display_threshold
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
        // @ts-expect-error TS(2304): Cannot find name 'div'.
        <div className={className}>
            // @ts-expect-error TS(2749): 'Paper' refers to a value, but is being used as a ...
            Remove this comment to see the full error message
            <Paper className="paper" elevation={4} square>
                // @ts-expect-error TS(2304): Cannot find name 'div'.
                <div className="step">
                    {displayProgress && (
                        // @ts-expect-error TS(2304): Cannot find name 'div'.
                        <div className="progress">
                            // @ts-expect-error TS(2304): Cannot find name 'div'.
                            <div className="progressChart">
                                // @ts-expect-error TS(2749): 'CircularProgressbarWithChildren'
                                refers to a valu... Remove this comment to see the full error
                                message
                                <CircularProgressbarWithChildren
                                    // @ts-expect-error TS(2304): Cannot find name 'value'.
                                    value={responseCount}
                                    // @ts-expect-error TS(2304): Cannot find name 'maxValue'.
                                    maxValue={progress.objective}
                                    // @ts-expect-error TS(2588): Cannot assign to 'styles' because it is a constant... Remove this comment to see the full error message
                                    styles={buildStyles({
                                        // @ts-expect-error TS(2300): Duplicate identifier '(Missing)'.
                                        pathColor: '#ef8200',
                                        // @ts-expect-error TS(2300): Duplicate identifier '(Missing)'.
                                        strokeLinecap: 'butt',
                                    })}
                                >
                                    // @ts-expect-error TS(2304): Cannot find name 'div'.
                                    <div
                                        className="progressChartContent"
                                        // @ts-expect-error TS(2304): Cannot find name 'dangerouslySetInnerHTML'.
                                        dangerouslySetInnerHTML={{
                                            __html: textToHtml(formatText(progress.message)),
                                        }}
                                        // @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
                                    ></div>
                                </CircularProgressbarWithChildren>
                            </div>
                        </div>
                    )}
                    // @ts-expect-error TS(2304): Cannot find name 'h1'.
                    <h1>
                        // @ts-expect-error TS(2709): Cannot use namespace 'LongText' as a type.
                        <LongText text={title} />
                    </h1>
                    // @ts-expect-error TS(2552): Cannot find name 'message'. Did you mean
                    'onmessag... Remove this comment to see the full error message
                    {message && (
                        // @ts-expect-error TS(2304): Cannot find name 'div'.
                        <div className="text">
                            // @ts-expect-error TS(2749): 'RichText' refers to a value, but is being
                            used as... Remove this comment to see the full error message
                            <RichText html={message} />
                        </div>
                    )}
                    // @ts-expect-error TS(2304): Cannot find name 'interpelationMode'.
                    {interpelationMode === 'rs' && (
                        // @ts-expect-error TS(2304): Cannot find name 'div'.
                        <div className="social-media">
                            // @ts-expect-error TS(2709): Cannot use namespace 'LinkTwitter' as a
                            type.
                            <LinkTwitter text={getTwitterText()} action={addTwitterMember} />
                        </div>
                    )}
                </div>
            </Paper>
            // @ts-expect-error TS(2304): Cannot find name 'interpelationMode'.
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
