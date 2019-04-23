import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';

import data from './data';

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
        object: data.getMailObject(),
        civility: data.getCivility(),
        surname: data.getSurname(),
        name: data.getName(),
        addressMain: data.getAddressMain(),
        addressMore: data.getAddressMore(),
        postalCode: data.getPostalCode(),
        city: data.getCity(),
        country: data.getCountry(),
        email: data.getEmail(),
    };

    setObject = object => {
        this.setState({ object });
        data.setMailObject(object);
    };

    setCivility = civility => {
        this.setState({ civility });
        data.setCivility(civility);
    };

    setSurname = surname => {
        this.setState({ surname });
        data.setSurname(surname);
    };

    setName = name => {
        this.setState({ name });
        data.setName(name);
    };

    setAddressMain = addressMain => {
        this.setState({ addressMain });
        data.setAddressMain(addressMain);
    };

    setAddressMore = addressMore => {
        this.setState({ addressMore });
        data.setAddressMore(addressMore);
    };

    setPostalCode = postalCode => {
        this.setState({ postalCode });
        data.setPostalCode(postalCode);
    };

    setCity = city => {
        this.setState({ city });
        data.setCity(city);
    };

    setCountry = country => {
        this.setState({ country });
        data.setCountry(country);
    };

    setEmail = email => {
        this.setState({ email });
        data.setEmail(email);
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
