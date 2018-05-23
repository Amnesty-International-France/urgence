import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';

import sessionData from './sessionData';

const { Provider, Consumer } = createContext({
    object: null,
    signature: null,
    changeObject: () => null,
    changeSignature: () => null,
});

export const SessionDataConsumer = Consumer;

export class SessionDataProvider extends Component {
    state = {
        object: sessionData.getMailObject(),
        signature: sessionData.getSignature(),
    };

    changeObject = event => {
        const object = event.target.value;
        this.setState({ object });
        sessionData.setMailObject(object);
    };

    changeSignature = event => {
        const signature = event.target.value;
        this.setState({ signature });
        sessionData.setSignature(signature);
    };

    render() {
        return (
            <Provider
                value={{
                    ...this.state,
                    changeObject: this.changeObject,
                    changeSignature: this.changeSignature,
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
