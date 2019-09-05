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

export const DataProvider = ({ children, defaultGdprMessage, defaultGdprRegister }) => {
    if (gdprMessage) {
        data.setGdprMessage(gdprMessage);
    }

    if (gdprRegister) {
        data.setGdprMessage(gdprRegister);
    }

    const [object, setMailObject] = useState(data.getMailObject());
    const [civility, setCivility] = useState(data.getCivility());
    const [firstname, setFirstname] = useState(data.getFirstname());
    const [lastname, setLastname] = useState(data.getLastname());
    const [addressMain, setAddressMain] = useState(data.getAddressMain());
    const [addressMore, setAddressMore] = useState(data.getAddressMore());
    const [postalCode, setPostalCode] = useState(data.getPostalCode());
    const [city, setCity] = useState(data.getCity());
    const [country, setCountry] = useState(data.getCountry());
    const [phone, setPhone] = useState(data.getPhone());
    const [email, setEmail] = useState(data.getEmail());
    const [registered, setRegistered] = useState(data.getRegistered());
    const [gdprMessage, setGdprMessage] = useState(defaultGdprMessage || data.getGdprMessage());
    const [gdprRegister, setGdprRegister] = useState(defaultGdprRegister || data.getGdprRegister());

    const handleSetObject = newObject => {
        setMailObject(newObject);
        data.setMailObject(newObject);
    };

    const handleSetCivility = civility => {
        setCivility(civility);
        data.setCivility(civility);
    };

    const handleSetFirstname = firstname => {
        setFirstname(firstname);
        data.setFirstname(firstname);
    };

    const handleSetLastname = lastname => {
        setLastname(lastname);
        data.setLastname(lastname);
    };

    const handleSetAddressMain = addressMain => {
        setAddressMain(addressMain);
        data.setAddressMain(addressMain);
    };

    const handleSetAddressMore = addressMore => {
        setAddressMore(addressMore);
        data.setAddressMore(addressMore);
    };

    const handleSetPostalCode = postalCode => {
        setPostalCode(postalCode);
        data.setPostalCode(postalCode);
    };

    const handleSetCity = city => {
        setCity(city);
        data.setCity(city);
    };

    const handleSetCountry = country => {
        setCountry(country);
        data.setCountry(country);
    };

    const handleSetPhone = phone => {
        setPhone(phone);
        data.setPhone(phone);
    };

    const handleSetEmail = email => {
        setEmail(email);
        data.setEmail(email);
    };

    const handleSetRegistered = () => {
        setRegistered('true');
        data.setRegistered('true');
    };

    const handleSetGdprMessage = gdprMessage => {
        setGdprMessage(gdprMessage);
        data.setGdprMessage(gdprMessage);
    };

    const handleSetGdprRegister = gdprRegister => {
        setGdprRegister(gdprRegister);
        data.setGdprRegister(gdprRegister);
    };

    return (
        <Provider
            value={{
                object,
                civility,
                firstname,
                lastname,
                addressMain,
                addressMore,
                postalCode,
                city,
                country,
                phone,
                email,
                registered,
                gdprMessage,
                gdprRegister,
                setObject: handleSetObject,
                setCivility: handleSetCivility,
                setFirstname: handleSetFirstname,
                setLastname: handleSetLastname,
                setAddressMain: handleSetAddressMain,
                setAddressMore: handleSetAddressMore,
                setPostalCode: handleSetPostalCode,
                setCity: handleSetCity,
                setCountry: handleSetCountry,
                setPhone: handleSetPhone,
                setEmail: handleSetEmail,
                setRegistered: handleSetRegistered,
                setGdprMessage: handleSetGdprMessage,
                setGdprRegister: handleSetGdprRegister,
            }}
        >
            {children}
        </Provider>
    );
};

DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
    defaultGdprMessage: PropTypes.string,
    defaultGdprRegister: PropTypes.string,
};

export const withSessionData = Component => props => (
    <DataConsumer>{context => <Component {...props} {...context} />}</DataConsumer>
);
