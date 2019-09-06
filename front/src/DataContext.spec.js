import React from 'react';
import { mount } from 'enzyme';

import { DataProvider, DataConsumer } from './DataContext';
import data from './data';

jest.mock('./data');

describe('DataContext', () => {
    beforeEach(() => {
        data.getMailObject.mockImplementation(() => 'object value');
        data.getCivility.mockImplementation(() => 'civility value');
        data.getFirstname.mockImplementation(() => 'firstname value');
        data.getLastname.mockImplementation(() => 'lastname value');
        data.getAddressMain.mockImplementation(() => 'addressMain value');
        data.getAddressMore.mockImplementation(() => 'addressMore value');
        data.getPostalCode.mockImplementation(() => 'postalCode value');
        data.getCity.mockImplementation(() => 'city value');
        data.getCountry.mockImplementation(() => 'country value');
        data.getPhone.mockImplementation(() => 'phone value');
        data.getEmail.mockImplementation(() => 'email value');
        data.getRegistered.mockImplementation(() => 'false');
        data.getGdprMessage.mockImplementation(() => 'serious business');
        data.getGdprRegister.mockImplementation(() => 'cool setting');
    });

    it('should initialize the context from data', () => {
        let contextTest = null;

        const render = context => {
            contextTest = { ...context };
            return <span>OK</span>;
        };
        mount(
            <DataProvider>
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(contextTest.object).toEqual('object value');
        expect(contextTest.civility).toEqual('civility value');
        expect(contextTest.firstname).toEqual('firstname value');
        expect(contextTest.lastname).toEqual('lastname value');
        expect(contextTest.addressMain).toEqual('addressMain value');
        expect(contextTest.addressMore).toEqual('addressMore value');
        expect(contextTest.postalCode).toEqual('postalCode value');
        expect(contextTest.city).toEqual('city value');
        expect(contextTest.country).toEqual('country value');
        expect(contextTest.phone).toEqual('phone value');
        expect(contextTest.email).toEqual('email value');
        expect(contextTest.registered).toEqual('false');
        expect(contextTest.gdprMessage).toEqual('serious business');
        expect(contextTest.gdprRegister).toEqual('cool setting');
    });

    it('should have a "setObject" method to change the state "object"', () => {
        const render = context => {
            context.setObject('new object');
            return <span>OK</span>;
        };
        mount(
            <DataProvider>
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setMailObject).toBeCalledWith('new object');
    });

    it('should have a "setCivility" method to change the state "civility"', () => {
        const render = context => {
            context.setCivility('new civility');
            return <span>OK</span>;
        };
        mount(
            <DataProvider>
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setCivility).toBeCalledWith('new civility');
    });

    it('should have a "setFirstname" method to change the state "firstname"', () => {
        const render = context => {
            context.setFirstname('new firstname');
            return <span>OK</span>;
        };
        mount(
            <DataProvider>
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setFirstname).toBeCalledWith('new firstname');
    });

    it('should have a "setLastname" method to change the state "lastname"', () => {
        const render = context => {
            context.setLastname('new lastname');
            return <span>OK</span>;
        };
        mount(
            <DataProvider>
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setLastname).toBeCalledWith('new lastname');
    });

    it('should have a "setAddressMain" method to change the state "addressMain"', () => {
        const render = context => {
            context.setAddressMain('new addressMain');
            return <span>OK</span>;
        };
        mount(
            <DataProvider>
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setAddressMain).toBeCalledWith('new addressMain');
    });

    it('should have a "setAddressMore" method to change the state "addressMore"', () => {
        const render = context => {
            context.setAddressMore('new addressMore');
            return <span>OK</span>;
        };
        mount(
            <DataProvider>
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setAddressMore).toBeCalledWith('new addressMore');
    });

    it('should have a "setPostalCode" method to change the state "postalCode"', () => {
        const render = context => {
            context.setPostalCode('new postalCode');
            return <span>OK</span>;
        };
        mount(
            <DataProvider>
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setPostalCode).toBeCalledWith('new postalCode');
    });

    it('should have a "setCity" method to change the state "city"', () => {
        const render = context => {
            context.setCity('new city');
            return <span>OK</span>;
        };
        mount(
            <DataProvider>
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setCity).toBeCalledWith('new city');
    });

    it('should have a "setCountry" method to change the state "country"', () => {
        const render = context => {
            context.setCountry('new country');
            return <span>OK</span>;
        };
        mount(
            <DataProvider>
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setCountry).toBeCalledWith('new country');
    });

    it('should have a "setPhone" method to change the state "phone"', () => {
        const render = context => {
            context.setPhone('new phone');
            return <span>OK</span>;
        };
        mount(
            <DataProvider>
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setPhone).toBeCalledWith('new phone');
    });

    it('should have a "setEmail" method to change the state "email"', () => {
        const render = context => {
            context.setEmail('new email');
            return <span>OK</span>;
        };
        mount(
            <DataProvider>
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setEmail).toBeCalledWith('new email');
    });

    it('should have a "setRegistered" method to change the state "registered"', () => {
        const render = context => {
            context.setRegistered();
            return <span>OK</span>;
        };
        mount(
            <DataProvider>
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setRegistered).toBeCalled();
    });

    it('should have a "setGdprMessage" method to change the state "gdprMessage"', () => {
        const render = context => {
            context.setGdprMessage('new gdprMessage');
            return <span>OK</span>;
        };
        mount(
            <DataProvider>
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setGdprMessage).toBeCalledWith('new gdprMessage');
    });

    it('should have a "setGdprRegister" method to change the state "setGdprRegister"', () => {
        const render = context => {
            context.setGdprRegister('new gdprRegister');
            return <span>OK</span>;
        };
        mount(
            <DataProvider>
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setGdprRegister).toBeCalledWith('new gdprRegister');
    });
});
