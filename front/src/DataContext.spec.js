import React from 'react';
import { shallow } from 'enzyme';

import { DataProvider } from './DataContext';
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
        data.getGdprMessage.mockImplementation(() => ({
            id: 1,
            type: 'gdpr-message',
            content: 'serious business',
        }));
        data.getGdprMessage.mockImplementation(() => ({
            id: 2,
            type: 'gdpr-register',
            content: 'cool setting',
        }));
    });

    it('should have state from sessionData', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);

        const state = wrapper.state();
        expect(state.object).toEqual('object value');
        expect(state.civility).toEqual('civility value');
        expect(state.firstname).toEqual('firstname value');
        expect(state.lastname).toEqual('lastname value');
        expect(state.addressMain).toEqual('addressMain value');
        expect(state.addressMore).toEqual('addressMore value');
        expect(state.postalCode).toEqual('postalCode value');
        expect(state.city).toEqual('city value');
        expect(state.country).toEqual('country value');
        expect(state.phone).toEqual('phone value');
        expect(state.email).toEqual('email value');
        expect(state.registered).toEqual('false');
        expect(state.gdprMessage.id).toEqual(1);
        expect(state.gdprMessage.type).toEqual('gdpr-message');
        expect(state.gdprMessage.id).toEqual('serious business');
        expect(state.gdprRegister.content).toEqual(2);
        expect(state.gdprRegister.type).toEqual('gdpr-register');
        expect(state.gdprRegister.content).toEqual('cool setting');
    });

    it('should have setObject method to change state.object', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setObject('new object');

        const state = wrapper.state();
        expect(state.object).toEqual('new object');
        expect(state.civility).toEqual('civility value');
        expect(state.firstname).toEqual('firstname value');
        expect(state.lastname).toEqual('lastname value');
        expect(state.addressMain).toEqual('addressMain value');
        expect(state.addressMore).toEqual('addressMore value');
        expect(state.postalCode).toEqual('postalCode value');
        expect(state.city).toEqual('city value');
        expect(state.country).toEqual('country value');
        expect(state.phone).toEqual('phone value');
        expect(state.email).toEqual('email value');
        expect(state.registered).toEqual('false');
        expect(state.gdprMessage.id).toEqual(1);
        expect(state.gdprMessage.type).toEqual('gdpr-message');
        expect(state.gdprMessage.id).toEqual('serious business');
        expect(state.gdprRegister.content).toEqual(2);
        expect(state.gdprRegister.type).toEqual('gdpr-register');
        expect(state.gdprRegister.content).toEqual('cool setting');

        expect(data.setMailObject).toBeCalledWith('new object');
    });

    it('should have setCivility method to change the state civility', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setCivility('new civility');

        const state = wrapper.state();
        expect(state.object).toEqual('object value');
        expect(state.civility).toEqual('new civility');
        expect(state.firstname).toEqual('firstname value');
        expect(state.lastname).toEqual('lastname value');
        expect(state.addressMain).toEqual('addressMain value');
        expect(state.addressMore).toEqual('addressMore value');
        expect(state.postalCode).toEqual('postalCode value');
        expect(state.city).toEqual('city value');
        expect(state.country).toEqual('country value');
        expect(state.phone).toEqual('phone value');
        expect(state.email).toEqual('email value');
        expect(state.registered).toEqual('false');
        expect(state.gdprMessage.id).toEqual(1);
        expect(state.gdprMessage.type).toEqual('gdpr-message');
        expect(state.gdprMessage.id).toEqual('serious business');
        expect(state.gdprRegister.content).toEqual(2);
        expect(state.gdprRegister.type).toEqual('gdpr-register');
        expect(state.gdprRegister.content).toEqual('cool setting');

        expect(data.setCivility).toBeCalledWith('new civility');
    });

    it('should have setFirstname method to change the state firstname', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setFirstname('new firstname');

        const state = wrapper.state();
        expect(state.object).toEqual('object value');
        expect(state.civility).toEqual('civility value');
        expect(state.firstname).toEqual('new firstname');
        expect(state.lastname).toEqual('lastname value');
        expect(state.addressMain).toEqual('addressMain value');
        expect(state.addressMore).toEqual('addressMore value');
        expect(state.postalCode).toEqual('postalCode value');
        expect(state.city).toEqual('city value');
        expect(state.country).toEqual('country value');
        expect(state.phone).toEqual('phone value');
        expect(state.email).toEqual('email value');
        expect(state.registered).toEqual('false');
        expect(state.gdprMessage.id).toEqual(1);
        expect(state.gdprMessage.type).toEqual('gdpr-message');
        expect(state.gdprMessage.id).toEqual('serious business');
        expect(state.gdprRegister.content).toEqual(2);
        expect(state.gdprRegister.type).toEqual('gdpr-register');
        expect(state.gdprRegister.content).toEqual('cool setting');

        expect(data.setFirstname).toBeCalledWith('new firstname');
    });

    it('should have setLastname method to change the state lastname', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setLastname('new lastname');

        const state = wrapper.state();
        expect(state.object).toEqual('object value');
        expect(state.civility).toEqual('civility value');
        expect(state.firstname).toEqual('firstname value');
        expect(state.lastname).toEqual('new lastname');
        expect(state.addressMain).toEqual('addressMain value');
        expect(state.addressMore).toEqual('addressMore value');
        expect(state.postalCode).toEqual('postalCode value');
        expect(state.city).toEqual('city value');
        expect(state.country).toEqual('country value');
        expect(state.phone).toEqual('phone value');
        expect(state.email).toEqual('email value');
        expect(state.registered).toEqual('false');
        expect(state.gdprMessage.id).toEqual(1);
        expect(state.gdprMessage.type).toEqual('gdpr-message');
        expect(state.gdprMessage.id).toEqual('serious business');
        expect(state.gdprRegister.content).toEqual(2);
        expect(state.gdprRegister.type).toEqual('gdpr-register');
        expect(state.gdprRegister.content).toEqual('cool setting');

        expect(data.setLastname).toBeCalledWith('new lastname');
    });

    it('should have setAddressMain method to change the state addressMain', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setAddressMain('new addressMain');

        const state = wrapper.state();
        expect(state.object).toEqual('object value');
        expect(state.civility).toEqual('civility value');
        expect(state.firstname).toEqual('firstname value');
        expect(state.lastname).toEqual('lastname value');
        expect(state.addressMain).toEqual('new addressMain');
        expect(state.addressMore).toEqual('addressMore value');
        expect(state.postalCode).toEqual('postalCode value');
        expect(state.city).toEqual('city value');
        expect(state.country).toEqual('country value');
        expect(state.phone).toEqual('phone value');
        expect(state.email).toEqual('email value');
        expect(state.registered).toEqual('false');
        expect(state.gdprMessage.id).toEqual(1);
        expect(state.gdprMessage.type).toEqual('gdpr-message');
        expect(state.gdprMessage.id).toEqual('serious business');
        expect(state.gdprRegister.content).toEqual(2);
        expect(state.gdprRegister.type).toEqual('gdpr-register');
        expect(state.gdprRegister.content).toEqual('cool setting');

        expect(data.setAddressMain).toBeCalledWith('new addressMain');
    });

    it('should have setAddressMore method to change the state addressMore', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setAddressMore('new addressMore');

        const state = wrapper.state();
        expect(state.object).toEqual('object value');
        expect(state.civility).toEqual('civility value');
        expect(state.firstname).toEqual('firstname value');
        expect(state.lastname).toEqual('lastname value');
        expect(state.addressMain).toEqual('addressMain value');
        expect(state.addressMore).toEqual('new addressMore');
        expect(state.postalCode).toEqual('postalCode value');
        expect(state.city).toEqual('city value');
        expect(state.country).toEqual('country value');
        expect(state.phone).toEqual('phone value');
        expect(state.email).toEqual('email value');
        expect(state.registered).toEqual('false');
        expect(state.gdprMessage.id).toEqual(1);
        expect(state.gdprMessage.type).toEqual('gdpr-message');
        expect(state.gdprMessage.id).toEqual('serious business');
        expect(state.gdprRegister.content).toEqual(2);
        expect(state.gdprRegister.type).toEqual('gdpr-register');
        expect(state.gdprRegister.content).toEqual('cool setting');

        expect(data.setAddressMore).toBeCalledWith('new addressMore');
    });

    it('should have setPostalCode method to change the state postalCode', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setPostalCode('new postalCode');

        const state = wrapper.state();
        expect(state.object).toEqual('object value');
        expect(state.civility).toEqual('civility value');
        expect(state.firstname).toEqual('firstname value');
        expect(state.lastname).toEqual('lastname value');
        expect(state.addressMain).toEqual('addressMain value');
        expect(state.addressMore).toEqual('addressMore value');
        expect(state.postalCode).toEqual('new postalCode');
        expect(state.city).toEqual('city value');
        expect(state.country).toEqual('country value');
        expect(state.phone).toEqual('phone value');
        expect(state.email).toEqual('email value');
        expect(state.registered).toEqual('false');
        expect(state.gdprMessage.id).toEqual(1);
        expect(state.gdprMessage.type).toEqual('gdpr-message');
        expect(state.gdprMessage.id).toEqual('serious business');
        expect(state.gdprRegister.content).toEqual(2);
        expect(state.gdprRegister.type).toEqual('gdpr-register');
        expect(state.gdprRegister.content).toEqual('cool setting');

        expect(data.setPostalCode).toBeCalledWith('new postalCode');
    });

    it('should have setCity method to change the state city', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setCity('new city');

        const state = wrapper.state();
        expect(state.object).toEqual('object value');
        expect(state.civility).toEqual('civility value');
        expect(state.firstname).toEqual('firstname value');
        expect(state.lastname).toEqual('lastname value');
        expect(state.addressMain).toEqual('addressMain value');
        expect(state.addressMore).toEqual('addressMore value');
        expect(state.postalCode).toEqual('postalCode value');
        expect(state.city).toEqual('new city');
        expect(state.country).toEqual('country value');
        expect(state.phone).toEqual('phone value');
        expect(state.email).toEqual('email value');
        expect(state.registered).toEqual('false');
        expect(state.gdprMessage.id).toEqual(1);
        expect(state.gdprMessage.type).toEqual('gdpr-message');
        expect(state.gdprMessage.id).toEqual('serious business');
        expect(state.gdprRegister.content).toEqual(2);
        expect(state.gdprRegister.type).toEqual('gdpr-register');
        expect(state.gdprRegister.content).toEqual('cool setting');

        expect(data.setCity).toBeCalledWith('new city');
    });

    it('should have setCountry method to change the state country', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setCountry('new country');

        const state = wrapper.state();
        expect(state.object).toEqual('object value');
        expect(state.civility).toEqual('civility value');
        expect(state.firstname).toEqual('firstname value');
        expect(state.lastname).toEqual('lastname value');
        expect(state.addressMain).toEqual('addressMain value');
        expect(state.addressMore).toEqual('addressMore value');
        expect(state.postalCode).toEqual('postalCode value');
        expect(state.city).toEqual('city value');
        expect(state.country).toEqual('new country');
        expect(state.phone).toEqual('phone value');
        expect(state.email).toEqual('email value');
        expect(state.registered).toEqual('false');
        expect(state.gdprMessage.id).toEqual(1);
        expect(state.gdprMessage.type).toEqual('gdpr-message');
        expect(state.gdprMessage.id).toEqual('serious business');
        expect(state.gdprRegister.content).toEqual(2);
        expect(state.gdprRegister.type).toEqual('gdpr-register');
        expect(state.gdprRegister.content).toEqual('cool setting');

        expect(data.setCountry).toBeCalledWith('new country');
    });

    it('should have setPhone method to change the state phone', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setPhone('new phone');

        const state = wrapper.state();
        expect(state.object).toEqual('object value');
        expect(state.civility).toEqual('civility value');
        expect(state.firstname).toEqual('firstname value');
        expect(state.lastname).toEqual('lastname value');
        expect(state.addressMain).toEqual('addressMain value');
        expect(state.addressMore).toEqual('addressMore value');
        expect(state.postalCode).toEqual('postalCode value');
        expect(state.city).toEqual('city value');
        expect(state.country).toEqual('country value');
        expect(state.phone).toEqual('new phone');
        expect(state.email).toEqual('email value');
        expect(state.registered).toEqual('false');
        expect(state.gdprMessage.id).toEqual(1);
        expect(state.gdprMessage.type).toEqual('gdpr-message');
        expect(state.gdprMessage.id).toEqual('serious business');
        expect(state.gdprRegister.content).toEqual(2);
        expect(state.gdprRegister.type).toEqual('gdpr-register');
        expect(state.gdprRegister.content).toEqual('cool setting');

        expect(data.setPhone).toBeCalledWith('new phone');
    });

    it('should have setEmail method to change the state email', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setEmail('new email');

        const state = wrapper.state();
        expect(state.object).toEqual('object value');
        expect(state.civility).toEqual('civility value');
        expect(state.firstname).toEqual('firstname value');
        expect(state.lastname).toEqual('lastname value');
        expect(state.addressMain).toEqual('addressMain value');
        expect(state.addressMore).toEqual('addressMore value');
        expect(state.postalCode).toEqual('postalCode value');
        expect(state.city).toEqual('city value');
        expect(state.country).toEqual('country value');
        expect(state.phone).toEqual('phone value');
        expect(state.email).toEqual('new email');
        expect(state.registered).toEqual('false');
        expect(state.gdprMessage.id).toEqual(1);
        expect(state.gdprMessage.type).toEqual('gdpr-message');
        expect(state.gdprMessage.id).toEqual('serious business');
        expect(state.gdprRegister.content).toEqual(2);
        expect(state.gdprRegister.type).toEqual('gdpr-register');
        expect(state.gdprRegister.content).toEqual('cool setting');

        expect(data.setEmail).toBeCalledWith('new email');
    });

    it('should have setRegistered method to change the state registered', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setRegistered();

        const state = wrapper.state();
        expect(state.object).toEqual('object value');
        expect(state.civility).toEqual('civility value');
        expect(state.firstname).toEqual('firstname value');
        expect(state.lastname).toEqual('lastname value');
        expect(state.addressMain).toEqual('addressMain value');
        expect(state.addressMore).toEqual('addressMore value');
        expect(state.postalCode).toEqual('postalCode value');
        expect(state.city).toEqual('city value');
        expect(state.country).toEqual('country value');
        expect(state.phone).toEqual('phone value');
        expect(state.email).toEqual('email value');
        expect(state.registered).toEqual('true');
        expect(state.gdprMessage.id).toEqual(1);
        expect(state.gdprMessage.type).toEqual('gdpr-message');
        expect(state.gdprMessage.id).toEqual('serious business');
        expect(state.gdprRegister.content).toEqual(2);
        expect(state.gdprRegister.type).toEqual('gdpr-register');
        expect(state.gdprRegister.content).toEqual('cool setting');

        expect(data.setRegistered).toBeCalled();
    });
});
