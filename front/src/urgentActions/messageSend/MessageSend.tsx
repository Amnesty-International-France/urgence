import React from 'react';
import styled from '@emotion/styled';
import { compose } from 'recompose';
import classnames from 'classnames';
import { black, RichText, white, withYellowLogo } from 'amnesty-components';
import Form from './Form';
import { withSessionData } from '../../DataContext';
import LegalInformation from '../LegalInformation';
import PaperForMobile from '../layout/PaperForMobile';

const styles = {
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: '18px',
    padding: '60px 15px 20px',
    height: 'calc(100vh - 30px)',
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
        height: '60px',
        '& a': {
            width: '100%',
        },

        '@media (max-width: 1024px)': {
            marginTop: '-30px',
        },
    },
    '& .text:': {
        margin: '0.5em 0',
    },
    '& .see-mail-disabled': {
        display: 'block',
        backgroundColor: '#b7b7b7',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '26px',
        padding: '0 1em',
        lineHeight: '42px',
        minWidth: '42px',
        color: '#f2f2f2',
        textTransform: 'uppercase',
        fontFamily: 'Amnesty Trade Gothic Condensed',
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
            '& .see-mail-disabled': {
                width: 'fit-content',
            },
        },
    },
    '@media (max-width: 1024px)': {
        '& .see-mail-disabled': {
            width: '100%',
            textAlign: 'center',
        },
    },
};

type IsValidProps = {
    civility?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
};

export const isValid = ({ civility, firstname, lastname, email }: IsValidProps): boolean => {
    if (
        typeof civility === 'string' &&
        civility.trim().length &&
        typeof firstname === 'string' &&
        firstname.trim().length &&
        typeof lastname === 'string' &&
        lastname.trim().length &&
        typeof email === 'string' &&
        email.trim().length
    ) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    return false;
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
    const { civility, firstname, lastname, email } = props;
    const displayAction = isValid({ civility, firstname, lastname, email });

    if (!messageTemplate || !messageTemplate.length) {
        return <p className="error">Cette action urgente n&#39;existe plus.</p>;
    }

    return (
        <div className={classnames('message-send', className)}>
            <PaperForMobile elevation={6} className={'paper'}>
                {text && (
                    <div className="text">
                        <RichText html={text} />
                    </div>
                )}
                <div className="form-step">
                    <Form {...props} />
                </div>
                {displayAction && <div className="action">{action}</div>}
                {!displayAction && (
                    <div className="action">
                        <div className="see-mail-disabled">Voir l'email</div>
                    </div>
                )}
                <LegalInformation content={gdprMessage} />
            </PaperForMobile>
        </div>
    );
};

// @ts-expect-error TS(2769): No overload matches this call.
const WithStylesMessageSend = styled(MessageSend)(styles);

// @ts-ignore guillaumep
export default compose(withYellowLogo, withSessionData)(WithStylesMessageSend);
