import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import classnames from 'classnames';
import React, { Fragment } from 'react';
import { compose } from 'recompose';
import { black, RichText, white, withYellowLogo } from 'amnesty-components';
import { withSessionData } from '../../DataContext';
import Form from './Form';
import LetterView from './LetterView';
import MobileDetect from 'mobile-detect';

const styles = {
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: '18px',
    padding: '60px 15px 20px',
    height: 'calc(100vh - 30px)',
    overflowY: 'auto',

    '@media (orientation: landscape)': {
        padding: '60px 120px 20px 60px',
        minHeight: 'calc(100vh - 30px)',

    },
    '& .paper': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: '100%',
        width: '100%',
        padding: '100px 20px 20px 20px !important',
        color: black,
        backgroundColor: white,
    },
    '& .action': {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px 15px',
        height: '60px',
        '& a': {
            width: '100%',
        },

        '@media (max-width: 1024px)': {
            marginTop: '-30px',
        }
    },
    '& .text:': {
        margin: '0.5em 0',
    },
    '& .form-step': {
        margin: '1em 0',
    },
    '& .label-step': {
        margin: '1em 0',
        '& span': {
            fontWeight: 'bold',
        },
    },
    '& .letter': {
        border: 'solid 1px',
        borderColor: 'rgba(0, 0, 0, 0.20)',
        boxShadow:
            '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
        color: black,
        padding: '0.5em 0',
        margin: '1em 0',
    },
    '& .content': {
        fontSize: '14px',
        position: 'relative',
        transition: 'all cubic-bezier(0.25, 0.1, 0.25, 1) 1s',
    },
    '& .showFullTextContent': {
        maxHeight: '548vh',
    },
    '& .showOnlyBeginContent': {
        maxHeight: '42vh',
        overflow: 'hidden',
    },
    '& .end': {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        margin: 0,
        backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0), white)',
        transition: 'all 1s',
    },
    '& .opacifyEnd': {
        paddingTop: '30vh',
    },
    '& .pleinEnd': {
        paddingTop: '10px',
    },
    '& .object-indication': {
        fontStyle: 'italic',
        fontSize: '14px',
        margin: '0.5em 0',
    },
    '@media (min-width: 1024px)': {
        fontSize: '24px',
        '&.paper': {
            padding: '10vh 10vw',
        },
        '& .action': {
            '& a': {
                width: 'fit-content',
            },
        },
    },
};

type Props = {
    className?: string;
    text: string;
    messageTemplate?: {
        value: string;
    }[];
    objectIndication: string;
    objectExample?: string;
    object?: string;
    setObject: (...args: any[]) => any;
    action: React.ReactNode;
    analyticsCategory?: string;
    step?: string;
};

export const MessageView = ({ className, text, messageTemplate, action, ...props }: Props) => {

    const isOnMobile = () => {
        const md = new MobileDetect(global.navigator.userAgent);
        return md.mobile();
    };

    if (!messageTemplate || !messageTemplate.length) {
        return <p className="error">Cette action urgente n&#39;existe plus.</p>;
    }

    return (
        <div className={classnames('message-view', className)}>
            {
                isOnMobile() ? (
                    <>
                        <Paper className="paper" elevation={6} square>
                            <div className="form-step">
                                <p className="label-step">
                                    <span>Étape 1:</span> saisir l&#39;objet de l&#39;email
                                </p>
                                <Form {...props} />
                            </div>

                            <p className="label-step">
                                <span>Étape 2:</span> envoyer l&#39;email
                            </p>
                            {text && (
                                <div className="text">
                                    <RichText html={text} />
                                </div>
                            )}
                            <LetterView messageTemplate={messageTemplate} />
                        </Paper>
                        <div className="action">{action}</div>
                    </>
                ) : (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        minHeight: '100%'
                    }}>
                        <div className="form-step">
                            <p className="label-step">
                                <span>Étape 1:</span> saisir l&#39;objet de l&#39;email
                            </p>
                            <Form {...props} />
                        </div>

                        <p className="label-step">
                            <span>Étape 2:</span> envoyer l&#39;email
                        </p>
                        {text && (
                            <div className="text">
                                <RichText html={text} />
                            </div>
                        )}
                        <LetterView messageTemplate={messageTemplate} />
                        <div className="action">{action}</div>
                    </div>
                )
            }
        </div>
    );
};

// @ts-expect-error TS(2769): No overload matches this call.
const WithStylesMessageView = styled(MessageView)(styles);
// @ts-expect-error TS(2769): No overload matches this call.
export default compose(withYellowLogo, withSessionData)(WithStylesMessageView);
