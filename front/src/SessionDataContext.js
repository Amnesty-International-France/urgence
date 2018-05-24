import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';

import sessionData from './sessionData';

const { Provider, Consumer } = createContext({
    object: null,
    signature: null,
    setObject: () => null,
    setSignature: () => null,
});

export const SessionDataConsumer = Consumer;

export class SessionDataProvider extends Component {
    state = {
        object: sessionData.getMailObject(),
        signature: sessionData.getSignature(),
    };

    setObject = object => {
        this.setState({ object });
        sessionData.setMailObject(object);
    };

    setSignature = signature => {
        this.setState({ signature });
        sessionData.setSignature(signature);
    };

    render() {
        return (
            <Provider
                value={{
                    ...this.state,
                    setObject: this.setObject,
                    setSignature: this.setSignature,
                }}
            >
                {this.props.children}
            </Provider>
        );
    }
}

SessionDataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
