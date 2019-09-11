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
});

export const DataConsumer = Consumer;

export const DataProvider = ({ children }) => {
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

    const handleSetObject = newObject => {
        setMailObject(newObject);
        data.setMailObject(newObject);
    };

    const handleSetCivility = newCivility => {
        setCivility(newCivility);
        data.setCivility(newCivility);
    };

    const handleSetFirstname = newFirstname => {
        setFirstname(newFirstname);
        data.setFirstname(newFirstname);
    };

    const handleSetLastname = newLastname => {
        setLastname(newLastname);
        data.setLastname(newLastname);
    };

    const handleSetAddressMain = newAddressMain => {
        setAddressMain(newAddressMain);
        data.setAddressMain(newAddressMain);
    };

    const handleSetAddressMore = newAddressMore => {
        setAddressMore(newAddressMore);
        data.setAddressMore(newAddressMore);
    };

    const handleSetPostalCode = newPostalCode => {
        setPostalCode(newPostalCode);
        data.setPostalCode(newPostalCode);
    };

    const handleSetCity = newCity => {
        setCity(newCity);
        data.setCity(newCity);
    };

    const handleSetCountry = newCountry => {
        setCountry(newCountry);
        data.setCountry(newCountry);
    };

    const handleSetPhone = newPhone => {
        setPhone(newPhone);
        data.setPhone(newPhone);
    };

    const handleSetEmail = newEmail => {
        setEmail(newEmail);
        data.setEmail(newEmail);
    };

    const handleSetRegistered = (newRegistered = 'false') => {
        setRegistered(newRegistered);
        data.setRegistered(newRegistered);
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
            }}
        >
            {children}
        </Provider>
    );
};

DataProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const withSessionData = Component => props => (
    <DataConsumer>{context => <Component {...props} {...context} />}</DataConsumer>
);
