import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import get from 'lodash.get';
import { compose } from 'recompose';
import classnames from 'classnames';
import Paper from '@material-ui/core/Paper';

import RichText from '../../themes/RichText';
import LongText from '../../themes/LongText';
import { isCorrectEmail } from '../../themes/Input';
import { white, black } from '../../themes/colors';
import { withYellowLogo, withYellowBackground } from '../../themes/ThemeContext';

import { withSessionData } from '../../DataContext';

import Form from './Form';
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

const isDisabled = props => {
    const { firstname, lastname, phone, email } = props;
    return !firstname || !lastname || !phone || !isCorrectEmail(email);
};

export const RegisterActivist = ({ data, gdprRegister, action, className, ...props }) => {
    const { firstname, lastname, phone, email } = props;
    const title = get(data, 'title');
    const text = get(data, 'text');
    const phoneIndication = get(data, 'phone_indication');

    return (
        <div className={classnames('register', className)}>
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
            <div className="action">
                {action(isDisabled(props), { firstname, lastname, phone, email })}
            </div>
            <LegalInformation content={gdprRegister} />
        </div>
    );
};

RegisterActivist.propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
        text: PropTypes.string.isRequired,
        phone_indication: PropTypes.string,
        button: PropTypes.string.isRequired,
    }),
    gdprRegister: PropTypes.string,
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
    civility: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    phoneIndication: PropTypes.string,
    phone: PropTypes.string,
    setCivility: PropTypes.func.isRequired,
    setFirstname: PropTypes.func.isRequired,
    setLastname: PropTypes.func.isRequired,
    setEmail: PropTypes.func.isRequired,
    setPhone: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
};

const WithStylesRegisterActivist = glamorous(RegisterActivist)(styles);

export default compose(
    withYellowLogo,
    withYellowBackground,
    withSessionData,
)(WithStylesRegisterActivist);
