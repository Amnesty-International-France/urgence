import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { compose } from 'recompose';
import classnames from 'classnames';

import { white, black } from '../../themes/colors';

import Form from './Form';
import { withYellowLogo } from '../../themes/ThemeContext';
import RichText from '../../themes/RichText';
import { withSessionData } from '../../DataContext';
import LegalInformation from '../LegalInformation';

const styles = {
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: '0.8em',
    display: 'flex',
    minHeight: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    padding: '135px 20px 20px 20px',
    color: black,
    backgroundColor: white,
    '& .action': {
        margin: '1em 0',
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
        padding: '10vh 10vw',
        '& .action': {
            display: 'flex',
            '& a': {
                width: 'fit-content',
            },
        },
    },
};

export const MessageSend = ({
    text,
    messageTemplate,
    gdprMessage,
    action,
    className,
    ...props
}) => {
    if (!messageTemplate || !messageTemplate.length) {
        return <p className="error">Cette action urgente n&#39;existe plus.</p>;
    }

    return (
        <div className={classnames('message-send', className)}>
            <div className="text">
                <RichText html={text} />
            </div>
            <div className="form-step">
                <Form {...props} />
            </div>
            <div className="action">{action}</div>
            <LegalInformation content={gdprMessage} />
        </div>
    );
};

MessageSend.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    messageTemplate: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired })),
    civility: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    setCivility: PropTypes.func.isRequired,
    setFirstname: PropTypes.func.isRequired,
    setLastname: PropTypes.func.isRequired,
    setEmail: PropTypes.func.isRequired,
    gdprMessage: PropTypes.string,
    action: PropTypes.node.isRequired,
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
};

const WithStylesMessageSend = glamorous(MessageSend)(styles);

export default compose(withYellowLogo, withSessionData)(WithStylesMessageSend);
