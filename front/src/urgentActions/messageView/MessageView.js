import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { compose } from 'recompose';
import classnames from 'classnames';

import { white, black } from '../../themes/colors';

import Form from './Form';
import LetterView from './LetterView';
import { withYellowLogo } from '../../themes/ThemeContext';
import RichText from '../../themes/RichText';
import { withSessionData } from '../../DataContext';

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

export const MessageView = ({ className, text, messageTemplate, action, ...props }) => {
    if (!messageTemplate || !messageTemplate.length) {
        return <p className="error">Cette action urgente n&#39;existe plus.</p>;
    }

    return (
        <div className={classnames('message-view', className)}>
            <div className="text">
                <RichText html={text} />
            </div>
            <div className="form-step">
                <Form {...props} />
            </div>
            <LetterView messageTemplate={messageTemplate} />
            <div className="action">{action}</div>
        </div>
    );
};

MessageView.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    messageTemplate: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired })),
    objectIndication: PropTypes.string.isRequired,
    object: PropTypes.string,
    setObject: PropTypes.func.isRequired,
    action: PropTypes.node.isRequired,
    analyticsCategory: PropTypes.string,
    step: PropTypes.string,
};

const WithStylesMessageView = glamorous(MessageView)(styles);

export default compose(withYellowLogo, withSessionData)(WithStylesMessageView);
