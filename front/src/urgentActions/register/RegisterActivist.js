import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import get from 'lodash.get';
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
    },
    '@media (max-width: 350px)': {
        fontSize: '0.8em',
    },
    '@media (min-width: 1024px)': {
        padding: '10vh 10vw',
    },
    '& .formStep': {
        margin: '5px 0px 10px 0px',
    },
};

const isDisabled = props => {
    const { firstname, lastname, phone, email } = props;
    return !firstname || !lastname || !phone || !isCorrectEmail(email);
};

export const RegisterActivist = ({ data, action, className, ...props }) => {
    const text = get(data, 'text');
    return (
        <Fragment>
            <div className={classnames('register', className)}>
                <p>{text}</p>
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
    data: PropTypes.shape({
        text: PropTypes.string.isRequired,
        button: PropTypes.string.isRequired,
    }),
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
