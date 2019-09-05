import React, { createContext, useState } from 'react';
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
    gdprMessage: null,
    gdprRegister: null,
});

export const DataConsumer = Consumer;

export const DataProvider = ({ children, gdprMessage, gdprRegister }) => {
    if (gdprMessage) {
        data.setGdprMessage(gdprMessage);
    }

    if (gdprRegister) {
        data.setGdprMessage(gdprRegister);
    }

    const [state, setState] = useState({
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
        gdprMessage: gdprMessage || data.getGdprMessage(),
        gdprRegister: gdprRegister || data.getGdprRegister(),
    });

    const setObject = object => {
        setState({ ...state, object });
        data.setMailObject(object);
    };

    const setCivility = civility => {
        setState({ ...state, civility });
        data.setCivility(civility);
    };

    const setFirstname = firstname => {
        this.setState({ ...state, firstname });
        data.setFirstname(firstname);
    };

    const setLastname = lastname => {
        setState({ ...state, lastname });
        data.setLastname(lastname);
    };

    const setAddressMain = addressMain => {
        this.setState({ ...state, addressMain });
        data.setAddressMain(addressMain);
    };

    const setAddressMore = addressMore => {
        setState({ ...state, addressMore });
        data.setAddressMore(addressMore);
    };

    const setPostalCode = postalCode => {
        setState({ ...state, postalCode });
        data.setPostalCode(postalCode);
    };

    const setCity = city => {
        setState({ ...state, city });
        data.setCity(city);
    };

    const setCountry = country => {
        setState({ ...state, country });
        data.setCountry(country);
    };

    const setPhone = phone => {
        setState({ ...state, phone });
        data.setPhone(phone);
    };

    const setEmail = email => {
        setState({ ...state, email });
        data.setEmail(email);
    };

    const setRegistered = () => {
        setState({ ...state, registered: 'true' });
        data.setRegistered('true');
    };

    const setGdprMessage = gdprMessage => {
        setState({ ...state, gdprMessage });
        data.setGdprMessage(gdprMessage);
    };

    const setGdprRegister = gdprRegister => {
        setState({ ...state, gdprRegister });
        data.setGdprRegister(gdprRegister);
    };

    return (
        <Provider
            value={{
                ...state,
                setObject,
                setCivility,
                setFirstname,
                setLastname,
                setAddressMain,
                setAddressMore,
                setPostalCode,
                setCity,
                setCountry,
                setPhone,
                setEmail,
                setRegistered,
                setGdprMessage,
                setGdprRegister,
            }}
        >
            {children}
        </Provider>
    );
};

DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
    gdprMessage: PropTypes.string,
    gdprRegister: PropTypes.string,
};

export const withSessionData = Component => props => (
    <DataConsumer>{context => <Component {...props} {...context} />}</DataConsumer>
);
