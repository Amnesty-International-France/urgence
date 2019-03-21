import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';

import sessionData from './sessionData';

const { Provider, Consumer } = createContext({
    object: '',
    civility: '',
    surname: '',
    name: '',
    addressMain: '',
    addressMore: '',
    postalCode: '',
    city: '',
    country: '',
    email: '',
    setObject: () => null,
    setCivility: () => null,
    setSurname: () => null,
    setName: () => null,
    setAddressMain: () => null,
    setAddressMore: () => null,
    setPostalCode: () => null,
    setCity: () => null,
    setCountry: () => null,
    setEmail: () => null,
});

export const SessionDataConsumer = Consumer;

export class SessionDataProvider extends Component {
    state = {
        object: sessionData.getMailObject(),
        civility: sessionData.getCivility(),
        surname: sessionData.getSurname(),
        name: sessionData.getName(),
        addressMain: sessionData.getAddressMain(),
        addressMore: sessionData.getAddressMore(),
        postalCode: sessionData.getPostalCode(),
        city: sessionData.getCity(),
        country: sessionData.getCountry(),
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

    setAddressMain = addressMain => {
        this.setState({ addressMain });
        sessionData.setAddressMain(addressMain);
    };

    setAddressMore = addressMore => {
        this.setState({ addressMore });
        sessionData.setAddressMore(addressMore);
    };

    setPostalCode = postalCode => {
        this.setState({ postalCode });
        sessionData.setPostalCode(postalCode);
    };

    setCity = city => {
        this.setState({ city });
        sessionData.setCity(city);
    };

    setCountry = country => {
        this.setState({ country });
        sessionData.setCountry(country);
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
                    setAddressMain: this.setAddressMain,
                    setAddressMore: this.setAddressMore,
                    setPostalCode: this.setPostalCode,
                    setCity: this.setCity,
                    setCountry: this.setCountry,
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
