import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import MessageStep from './MessageStep';
import SignatureStep from './SignatureStep';
import sessionData from '../../sessionData';
import SendMail from './SendMail';

export class Message extends Component {
    state = {
        object: sessionData.getMailObject(),
        signature: sessionData.getSignature(),
    };

    changeSignature = e => {
        const signature = e.target.value;
        this.setState({ signature });
        sessionData.setSignature(signature);
    };

    render() {
        const { messageTemplate, loading, recipient, action } = this.props;

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
                            <div className="action">{action}</div>
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
    loading: PropTypes.bool.isRequired,
    recipient: PropTypes.shape({
        mail: PropTypes.string.isRequired,
        copies_to: PropTypes.string,
        cci: PropTypes.string,
    }).isRequired,
    action: PropTypes.node.isRequired,
};

export default Message;
