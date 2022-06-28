import React, { createContext, useState } from 'react';

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

type DataProviderProps = {
    children: React.ReactNode;
};

export const DataProvider = ({ children }: DataProviderProps) => {
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

    const handleSetObject = (newObject: any) => {
        setMailObject(newObject);
        data.setMailObject(newObject);
    };

    const handleSetCivility = (newCivility: any) => {
        setCivility(newCivility);
        data.setCivility(newCivility);
    };

    const handleSetFirstname = (newFirstname: any) => {
        setFirstname(newFirstname);
        data.setFirstname(newFirstname);
    };

    const handleSetLastname = (newLastname: any) => {
        setLastname(newLastname);
        data.setLastname(newLastname);
    };

    const handleSetAddressMain = (newAddressMain: any) => {
        setAddressMain(newAddressMain);
        data.setAddressMain(newAddressMain);
    };

    const handleSetAddressMore = (newAddressMore: any) => {
        setAddressMore(newAddressMore);
        data.setAddressMore(newAddressMore);
    };

    const handleSetPostalCode = (newPostalCode: any) => {
        setPostalCode(newPostalCode);
        data.setPostalCode(newPostalCode);
    };

    const handleSetCity = (newCity: any) => {
        setCity(newCity);
        data.setCity(newCity);
    };

    const handleSetCountry = (newCountry: any) => {
        setCountry(newCountry);
        data.setCountry(newCountry);
    };

    const handleSetPhone = (newPhone: any) => {
        setPhone(newPhone);
        data.setPhone(newPhone);
    };

    const handleSetEmail = (newEmail: any) => {
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
                // @ts-expect-error TS(2322): Type '{ object: any; civility: any; firstname: any... Remove this comment to see the full error message
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

export const withSessionData = (Component: any) => (props: any) =>
    <DataConsumer>{(context) => <Component {...props} {...context} />}</DataConsumer>;
