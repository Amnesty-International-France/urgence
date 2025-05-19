import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import classnames from 'classnames';
import get from 'lodash.get';
import { compose } from 'recompose';

import { black, RichText, white, withYellowBackground, withYellowLogo } from 'amnesty-components';
import { isCorrectEmail, isCorrectPhone } from '../../themes/Input';
import LongText from '../../themes/LongText';

import { withSessionData } from '../../DataContext';

import LegalInformation from '../LegalInformation';
import Form from './Form';
import { isValid as isValidUserInformation } from '../messageSend/MessageSend';
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
        padding: '100px 20px 20px 20px',
        color: black,
        backgroundColor: white,
    },
    '& h1': {
        fontFamily: 'Amnesty Trade Gothic Condensed',
        fontSize: '30px',
        color: black,
        textTransform: 'uppercase',
        lineHeight: '30px',
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
    '& .text, .phone-indication': {
        margin: '0.5em 0',
    },
    '& .form-step': {
        margin: '1em 0',
    },
    '& .register-disabled': {
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
    '@media (max-width: 1024px)': {
        '& .register-disabled': {
            width: '100%',
            textAlign: 'center',
        },
    },
};

const isDisabled = (props: any) => {
    const { firstname, lastname, phone, email } = props;
    return !firstname || !lastname || !isCorrectPhone(phone) || !isCorrectEmail(email);
};

type IsValidProps = {
    civility?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
};

export const isValid = ({ civility, firstname, lastname, email, phone }: IsValidProps): boolean => {
    if (!isValidUserInformation({ civility, firstname, lastname, email })) {
        return false;
    }

    return isCorrectPhone(phone);
};

type RegisterActivistProps = {
    className?: string;
    data?: {
        text: string;
        phone_indication?: string;
        button: string;
    };
    gdprRegister?: string;
    analyticsCategory?: string;
    step?: string;
    civility?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phoneIndication?: string;
    phone?: string;
    setCivility: (...args: any[]) => any;
    setFirstname: (...args: any[]) => any;
    setLastname: (...args: any[]) => any;
    setEmail: (...args: any[]) => any;
    setPhone: (...args: any[]) => any;
    action: (...args: any[]) => any;
};

export const RegisterActivist = ({
                                     data,
                                     gdprRegister,
                                     action,
                                     className,
                                     ...props
                                 }: RegisterActivistProps) => {
    const { firstname, lastname, phone, email, civility } = props;
    const title = get(data, 'title');
    const text = get(data, 'text');
    const phoneIndication = get(data, 'phone_indication');
    const displayAction = isValid({ firstname, lastname, phone, email, civility });
    const isOnMobile = () => {
        const md = new MobileDetect(global.navigator.userAgent);
        return md.mobile();
    };

    return (
        <div className={classnames('register', className)}>
            {isOnMobile() ?
                (
                    <Paper className="paper" elevation={6} square>
                        <div className="header">
                            <h1>
                                <LongText text={title} />
                            </h1>
                            {text && (
                                <div className="text">
                                    <RichText html={text} />
                                </div>
                            )}
                        </div>
                        <div className="form-step">
                            <Form phoneIndication={phoneIndication} {...props} />
                        </div>
                    </Paper>
                ) : (
                    <>
                        <div className="header">
                            <h1>
                                <LongText text={title} />
                            </h1>
                            {text && (
                                <div className="text">
                                    <RichText html={text} />
                                </div>
                            )}
                        </div>
                        <div className="form-step">
                            <Form phoneIndication={phoneIndication} {...props} />
                        </div>
                    </>
                )

            }
            {displayAction && <div className="action">
                {action(isDisabled(props), { firstname, lastname, phone, email, civility })}
            </div>}
            {!displayAction && <div className="action">
                <div className="register-disabled">Je m'inscris</div>
            </div>}
            <LegalInformation content={gdprRegister} />
        </div>
    );
};

// @ts-expect-error TS(2769): No overload matches this call.
const WithStylesRegisterActivist = styled(RegisterActivist)(styles);

export default compose(
    withYellowLogo,
    withYellowBackground,
    withSessionData,
    // @ts-ignore
)(WithStylesRegisterActivist);
