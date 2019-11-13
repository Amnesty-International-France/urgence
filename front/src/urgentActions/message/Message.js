import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { compose } from 'recompose';
import classnames from 'classnames';

import { white, black } from '../../themes/colors';

import Form from './Form';
import LetterView from './LetterView';
import { withYellowLogo } from '../../themes/ThemeContext';
import { withSessionData } from '../../DataContext';
import LegalInformation from '../LegalInformation';

const styles = {
    fontFamily: 'Amnesty Trade Gothic LT',
    fontSize: '16px',
    display: 'flex',
    minHeight: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    padding: '100px 20px 20px 20px',
    color: black,
    backgroundColor: white,
    '@media (max-width: 1024px)': {
        marginBottom: 40,
    },
    '& .action': {
        margin: '1em 0',
        '@media (min-width: 1024px)': {
            display: 'flex',
        },
    },
    '@media (max-width: 350px)': {
        fontSize: '0.8em',
    },
    '@media (min-width: 1024px)': {
        padding: '10vh 10vw',
    },
    '& .importantText': {
        fontWeight: 'bold',
    },
    '& .letter': {
        border: 'solid 1px',
        borderColor: 'rgba(0, 0, 0, 0.20)',
        boxShadow:
            '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
        color: black,
        padding: '1em 0 0 0',
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
    '& .objectIndication': {
        fontStyle: 'italic',
        fontSize: '14px',
    },
    '& .formStep': {
        margin: '5px 0px 10px 0px',
    },
};

export const Message = ({ messageTemplate, gdprMessage, action, className, ...props }) => {
    if (!messageTemplate || !messageTemplate.length) {
        return <p className="error">Cette action urgente n&#39;existe plus.</p>;
    }

    return (
        <div className={classnames('message', className)}>
            <p>
                Parce que les messages uniques ont plus d&#39;impact,&nbsp;
                <strong className="importantText">
                    nous vous invitons à personnaliser l&#39;objet de l&#39;email.
                </strong>
            </p>
            <div className="formStep">
                <Form {...props} />
            </div>
            <LetterView messageTemplate={messageTemplate} />
            <div className="action">{action}</div>
            <LegalInformation content={gdprMessage} />
        </div>
    );
};

Message.propTypes = {
    messageTemplate: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired })),
    email: PropTypes.string,
    objectIndication: PropTypes.string.isRequired,
    className: PropTypes.string,
    setEmail: PropTypes.func.isRequired,
    setObject: PropTypes.func.isRequired,
    setCivility: PropTypes.func.isRequired,
    setFirstname: PropTypes.func.isRequired,
    setLastname: PropTypes.func.isRequired,
    object: PropTypes.string,
    civility: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    gdprMessage: PropTypes.string,
    action: PropTypes.node.isRequired,
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
};

const WithStylesMessage = glamorous(Message)(styles);

export default compose(withYellowLogo, withSessionData)(WithStylesMessage);
