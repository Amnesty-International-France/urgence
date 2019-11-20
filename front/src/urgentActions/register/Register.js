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
import { withYellowLogo } from '../../themes/ThemeContext';

import { withSessionData } from '../../DataContext';

import Form from './Form';
import LegalInformation from '../LegalInformation';

const styles = {
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: '0.8em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    minHeight: '100%',
    width: '100%',
    '& .paper': {
        color: black,
        backgroundColor: white,
        padding: '135px 20px 20px 20px',
    },
    '& .header': {
        margin: '1em 0',
    },
    '& h1': {
        textTransform: 'uppercase',
        fontFamily: 'Amnesty Trade Gothic Condensed',
        fontSize: '36px',
        lineHeight: '54px',
        fontWeight: 'bold',
        margin: '1.5rem 12px',
        width: 'calc(100% - 24px)',
        '> span': {
            color: white,
            backgroundColor: black,
            padding: '6px 0',
            boxShadow: `12px 0 0 ${black}, -12px 0 0 ${black}`,
            boxDecorationBreak: 'clone',
        },
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
    '& .form-step': {
        margin: '5px 0px 10px 0px',
    },
    '@media (min-width: 350px)': {
        fontSize: '16px',
    },
    '@media (min-width: 1024px)': {
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
    const title = get(data, 'title');
    const { firstname, lastname, phone, email } = props;
    const text = get(data, 'text');
    return (
        <div className={classnames('register', className)}>
            <Paper className="paper" elevation={4} square>
                <div className="header">
                    <h1>
                        <LongText text={title} />
                    </h1>
                    {text && <RichText html={text} />}
                </div>
                <div className="form-step">
                    <Form {...props} />
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
        button: PropTypes.string.isRequired,
    }),
    gdprRegister: PropTypes.string,
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

const WithStylesRegisterActivist = glamorous(RegisterActivist)(styles);

export default compose(withYellowLogo, withSessionData)(WithStylesRegisterActivist);
