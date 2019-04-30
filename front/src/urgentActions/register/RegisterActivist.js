import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { compose } from 'recompose';
import classnames from 'classnames';

import { isCorrectEmail } from '../../themes/Input';

import { white, black } from '../../themes/colors';
import { withYellowLogo } from '../../themes/ThemeContext';
import { withSessionData } from '../../DataContext';

import Form from './Form';

const styles = {
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: '16px',
    display: 'flex',
    minHeight: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '100%',
    padding: '100px 20px 20px 20px',
    color: black,
    backgroundColor: white,
    '& .action': {
        '@media (min-width: 1024px)': {
            display: 'flex',
            margin: '1em 0',
        },
        '@media (max-width: 1024px)': {
            backgroundColor: white,
            margin: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            position: 'fixed',
            bottom: 0,
        },
    },
    '@media (max-width: 350px)': {
        fontSize: '0.8em',
    },
    '@media (min-width: 1024px)': {
        padding: '10vh 10vw',
    },
    '& .formStep': {
        margin: '5px 0px',
    },
};

const isDisabled = props => {
    const { firstname, lastname, phone, email } = props;
    return !firstname || !lastname || !phone || !isCorrectEmail(email);
};

export const RegisterActivist = ({ action, className, ...props }) => {
    return (
        <Fragment>
            <div className={classnames('register', className)}>
                <p>
                    {`L'expérience vous a plu ? Inscrivez-vous pour recevoir les actions urgentes suivantes !`}
                </p>
                <div className="formStep">
                    <Form {...props} />
                </div>
                <div className="action">{action(isDisabled(props))}</div>
            </div>
        </Fragment>
    );
};

RegisterActivist.propTypes = {
    className: PropTypes.string,
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
    civility: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    setCivility: PropTypes.func.isRequired,
    setEmail: PropTypes.func.isRequired,
    setPhone: PropTypes.func.isRequired,
    setFirstname: PropTypes.func.isRequired,
    setLastname: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
};

export default glamorous(
    compose(
        withYellowLogo,
        withSessionData,
    )(RegisterActivist),
)(styles);
