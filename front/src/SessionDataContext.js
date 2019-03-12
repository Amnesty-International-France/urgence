import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';

import sessionData from './sessionData';

const { Provider, Consumer } = createContext({
    object: null,
    civility: null,
    surname: null,
    name: null,
    setObject: () => null,
    setCivility: () => null,
    setSurname: () => null,
    setName: () => null,
    setAddress: () => null,
    setMail: () => null,
});

export const SessionDataConsumer = Consumer;

export class SessionDataProvider extends Component {
    state = {
        object: sessionData.getMailObject(),
        civility: sessionData.getCivility(),
        surname: sessionData.getSurname(),
        name: sessionData.getName(),
        address: sessionData.getAddress(),
        email: sessionData.getEmail(),
    };

    setObject = object => {
        this.setState({ object });
        sessionData.setMailObject(object);
    };

    setCivility = civility => {
        this.setState({ civility });
        sessionData.setCivility(civility);
    };

    setSurname = surname => {
        this.setState({ surname });
        sessionData.setSurname(surname);
    };

    setName = name => {
        this.setState({ name });
        sessionData.setName(name);
    };

    setAddress = address => {
        this.setState({ address });
        sessionData.setAddress(address);
    };

    setEmail = email => {
        this.setState({ email });
        sessionData.setEmail(email);
    };

    render() {
        return (
            <Provider
                value={{
                    ...this.state,
                    setObject: this.setObject,
                    setCivility: this.setCivility,
                    setSurname: this.setSurname,
                    setName: this.setName,
                    setAddress: this.setAddress,
                    setEmail: this.setEmail,
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

export const withSessionData = Component => props => (
    <SessionDataConsumer>{context => <Component {...props} {...context} />}</SessionDataConsumer>
);
