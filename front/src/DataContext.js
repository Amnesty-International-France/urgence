import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';

import data from './data';

const { Provider, Consumer } = createContext({
    object: '',
    civility: '',
    firstname: '',
    lastname: '',
    addressMain: '',
    addressMore: '',
    postalCode: '',
    city: '',
    country: '',
    phone: '',
    email: '',
    registered: 'false',
    setObject: () => null,
    setCivility: () => null,
    setFirstname: () => null,
    setLastname: () => null,
    setAddressMain: () => null,
    setAddressMore: () => null,
    setPostalCode: () => null,
    setCity: () => null,
    setCountry: () => null,
    setPhone: () => null,
    setEmail: () => null,
    setRegistered: () => null,
});

export const DataConsumer = Consumer;

export class DataProvider extends Component {
    state = {
        object: data.getMailObject(),
        civility: data.getCivility(),
        firstname: data.getFirstname(),
        lastname: data.getLastname(),
        addressMain: data.getAddressMain(),
        addressMore: data.getAddressMore(),
        postalCode: data.getPostalCode(),
        city: data.getCity(),
        country: data.getCountry(),
        phone: data.getPhone(),
        email: data.getEmail(),
        registered: data.getRegistered(),
    };

    setObject = object => {
        this.setState({ object });
        data.setMailObject(object);
    };

    setCivility = civility => {
        this.setState({ civility });
        data.setCivility(civility);
    };

    setFirstname = firstname => {
        this.setState({ firstname });
        data.setFirstname(firstname);
    };

    setLastname = lastname => {
        this.setState({ lastname });
        data.setLastname(lastname);
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

    setPhone = phone => {
        this.setState({ phone });
        data.setPhone(phone);
    };

    setEmail = email => {
        this.setState({ email });
        data.setEmail(email);
    };

    setRegistered = registered => {
        this.setState({ registered });
        data.setRegistered(registered);
    };

    render() {
        return (
            <Provider
                value={{
                    ...this.state,
                    setObject: this.setObject,
                    setCivility: this.setCivility,
                    setFirstname: this.setFirstname,
                    setLastname: this.setLastname,
                    setAddressMain: this.setAddressMain,
                    setAddressMore: this.setAddressMore,
                    setPostalCode: this.setPostalCode,
                    setCity: this.setCity,
                    setCountry: this.setCountry,
                    setPhone: this.setPhone,
                    setEmail: this.setEmail,
                    setRegistered: this.setRegistered,
                }}
            >
                {this.props.children}
            </Provider>
        );
    }
}

DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const withSessionData = Component => props => (
    <DataConsumer>{context => <Component {...props} {...context} />}</DataConsumer>
);
