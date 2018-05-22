import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import MessageStep from './MessageStep';
import ObjectStep from './ObjectStep';
import SignatureStep from './SignatureStep';
import { routeMatch } from '../../propTypes';
import generateUrl from '../../services/generateUrl';
import sessionData from '../../sessionData';
import SendMail from './SendMail';

export class Message extends Component {
    state = {
        object: sessionData.getMailObject(),
        signature: sessionData.getSignature(),
    };

    afterChange = page => {
        const {
            match: {
                params: { id, page: currentPage },
            },
            history,
        } = this.props;

        if (page.toString() === currentPage) {
            return;
        }
        history.push(generateUrl('message', { id, page }));
    };

    afterMail = () => {
        const {
            history,
            match: { params },
        } = this.props;

        history.push(generateUrl('thanks', params));
    };

    changeObject = e => {
        const object = e.target.value;
        this.setState({ object });
        sessionData.setMailObject(object);
    };

    changeSignature = e => {
        const signature = e.target.value;
        this.setState({ signature });
        sessionData.setSignature(signature);
    };

    render() {
        const { objectIndication, messageTemplate, loading, recipient } = this.props;

        const { signature, object } = this.state;

        return loading ? (
            <p className="loading">Loading...</p>
        ) : (
            <Fragment>
                {(!messageTemplate || !messageTemplate.length) && (
                    <p className="error">Cette action urgent n&#39;existe plus.</p>
                )}

                {messageTemplate &&
                    messageTemplate.length > 0 && (
                        <div>
                            {messageTemplate.map(({ value }, index) => (
                                <MessageStep key={value} content={value} darken={!!(index % 2)} />
                            ))}
                            <ObjectStep
                                object={object}
                                changeObject={this.changeObject}
                                objectIndication={objectIndication}
                                messageTemplate={messageTemplate}
                            />
                            <SignatureStep
                                signature={signature}
                                changeSignature={this.changeSignature}
                                action={
                                    <SendMail
                                        recipient={recipient}
                                        messageTemplate={messageTemplate}
                                        signature={signature}
                                        object={object}
                                        afterMail={this.afterMail}
                                    />
                                }
                            />
                        </div>
                    )}
            </Fragment>
        );
    }
}

Message.propTypes = {
    messageTemplate: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired })),
    objectIndication: PropTypes.string.isRequired,
    className: PropTypes.string,
    match: routeMatch,
    loading: PropTypes.bool.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    recipient: PropTypes.shape({
        mail: PropTypes.string.isRequired,
        copies_to: PropTypes.string,
        cci: PropTypes.string,
    }).isRequired,
};

export default withRouter(Message);
