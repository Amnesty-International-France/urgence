import React from 'react';
import styled from '@emotion/styled';
import { compose } from 'recompose';
import classnames from 'classnames';
import Paper from '@mui/material/Paper';

import { white, black } from 'amnesty-components';

import Form from './Form';
import { withYellowLogo } from '../../themes/ThemeContext';
import RichText from '../../themes/RichText';
import { withSessionData } from '../../DataContext';
import LegalInformation from '../LegalInformation';

const styles = {
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: '18px',
    padding: '60px 15px 20px',
    height: 'calc(100vh - 30px)',
    '& .paper': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: '100%',
        width: '100%',
        padding: '100px 20px 20px 20px',
        color: black,
        backgroundColor: white,
    },
    '& .action': {
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
    '& .text:': {
        margin: '0.5em 0',
    },
    '& .form-step': {
        margin: '1em 0',
    },
    '@media (min-width: 1024px)': {
        fontSize: '24px',
        '& .paper': {
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
    civility?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    setCivility: (...args: any[]) => any;
    setFirstname: (...args: any[]) => any;
    setLastname: (...args: any[]) => any;
    setEmail: (...args: any[]) => any;
    gdprMessage?: string;
    action: React.ReactNode;
    analyticsCategory?: string;
    step?: string;
};

export const MessageSend = ({
    text,
    messageTemplate,
    gdprMessage,
    action,
    className,
    ...props
}: Props) => {
    if (!messageTemplate || !messageTemplate.length) {
        return <p className="error">Cette action urgente n&#39;existe plus.</p>;
    }

    return (
        <div className={classnames('message-send', className)}>
            <Paper className="paper" elevation={6} square>
                {text && (
                    <div className="text">
                        <RichText html={text} />
                    </div>
                )}
                <div className="form-step">
                    <Form {...props} />
                </div>
            </Paper>
            <div className="action">{action}</div>
            <LegalInformation content={gdprMessage} />
        </div>
    );
};

// @ts-expect-error TS(2769): No overload matches this call.
const WithStylesMessageSend = styled(MessageSend)(styles);

// @ts-ignore guillaumep
export default compose(withYellowLogo, withSessionData)(WithStylesMessageSend);
