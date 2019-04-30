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
        data.getRegistered.mockImplementation(() => 'registered value');
    });

    it('should have state from sessionData', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        expect(wrapper.state()).toEqual({
            object: 'object value',
            civility: 'civility value',
            firstname: 'firstname value',
            lastname: 'lastname value',
            addressMain: 'addressMain value',
            addressMore: 'addressMore value',
            postalCode: 'postalCode value',
            city: 'city value',
            country: 'country value',
            phone: 'phone value',
            email: 'email value',
            registered: 'registered value',
        });
    });

    it('should have setObject method to change state.object', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setObject('new object');
        expect(wrapper.state()).toEqual({
            object: 'new object',
            civility: 'civility value',
            firstname: 'firstname value',
            lastname: 'lastname value',
            addressMain: 'addressMain value',
            addressMore: 'addressMore value',
            postalCode: 'postalCode value',
            city: 'city value',
            country: 'country value',
            phone: 'phone value',
            email: 'email value',
            registered: 'registered value',
        });
        expect(data.setMailObject).toBeCalledWith('new object');
    });

    it('should have setCivility method to change the state civility', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setCivility('new civility');
        expect(wrapper.state()).toEqual({
            object: 'object value',
            civility: 'new civility',
            firstname: 'firstname value',
            lastname: 'lastname value',
            addressMain: 'addressMain value',
            addressMore: 'addressMore value',
            postalCode: 'postalCode value',
            city: 'city value',
            country: 'country value',
            phone: 'phone value',
            email: 'email value',
            registered: 'registered value',
        });
        expect(data.setCivility).toBeCalledWith('new civility');
    });

    it('should have setFirstname method to change the state firstname', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setFirstname('new firstname');
        expect(wrapper.state()).toEqual({
            object: 'object value',
            civility: 'civility value',
            firstname: 'new firstname',
            lastname: 'lastname value',
            addressMain: 'addressMain value',
            addressMore: 'addressMore value',
            postalCode: 'postalCode value',
            city: 'city value',
            country: 'country value',
            phone: 'phone value',
            email: 'email value',
            registered: 'registered value',
        });
        expect(data.setFirstname).toBeCalledWith('new firstname');
    });

    it('should have setLastname method to change the state lastname', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setLastname('new lastname');
        expect(wrapper.state()).toEqual({
            object: 'object value',
            civility: 'civility value',
            firstname: 'firstname value',
            lastname: 'new lastname',
            addressMain: 'addressMain value',
            addressMore: 'addressMore value',
            postalCode: 'postalCode value',
            city: 'city value',
            country: 'country value',
            phone: 'phone value',
            email: 'email value',
            registered: 'registered value',
        });
        expect(data.setLastname).toBeCalledWith('new lastname');
    });

    it('should have setAddressMain method to change the state addressMain', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setAddressMain('new addressMain');
        expect(wrapper.state()).toEqual({
            object: 'object value',
            civility: 'civility value',
            firstname: 'firstname value',
            lastname: 'lastname value',
            addressMain: 'new addressMain',
            addressMore: 'addressMore value',
            postalCode: 'postalCode value',
            city: 'city value',
            country: 'country value',
            phone: 'phone value',
            email: 'email value',
            registered: 'registered value',
        });
        expect(data.setAddressMain).toBeCalledWith('new addressMain');
    });

    it('should have setAddressMore method to change the state addressMore', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setAddressMore('new addressMore');
        expect(wrapper.state()).toEqual({
            object: 'object value',
            civility: 'civility value',
            firstname: 'firstname value',
            lastname: 'lastname value',
            addressMain: 'addressMain value',
            addressMore: 'new addressMore',
            postalCode: 'postalCode value',
            city: 'city value',
            country: 'country value',
            phone: 'phone value',
            email: 'email value',
            registered: 'registered value',
        });
        expect(data.setAddressMore).toBeCalledWith('new addressMore');
    });

    it('should have setPostalCode method to change the state postalCode', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setPostalCode('new postalCode');
        expect(wrapper.state()).toEqual({
            object: 'object value',
            civility: 'civility value',
            firstname: 'firstname value',
            lastname: 'lastname value',
            addressMain: 'addressMain value',
            addressMore: 'addressMore value',
            postalCode: 'new postalCode',
            city: 'city value',
            country: 'country value',
            phone: 'phone value',
            email: 'email value',
            registered: 'registered value',
        });
        expect(data.setPostalCode).toBeCalledWith('new postalCode');
    });

    it('should have setCity method to change the state city', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setCity('new city');
        expect(wrapper.state()).toEqual({
            object: 'object value',
            civility: 'civility value',
            firstname: 'firstname value',
            lastname: 'lastname value',
            addressMain: 'addressMain value',
            addressMore: 'addressMore value',
            postalCode: 'postalCode value',
            city: 'new city',
            country: 'country value',
            phone: 'phone value',
            email: 'email value',
            registered: 'registered value',
        });
        expect(data.setCity).toBeCalledWith('new city');
    });

    it('should have setCountry method to change the state country', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setCountry('new country');
        expect(wrapper.state()).toEqual({
            object: 'object value',
            civility: 'civility value',
            firstname: 'firstname value',
            lastname: 'lastname value',
            addressMain: 'addressMain value',
            addressMore: 'addressMore value',
            postalCode: 'postalCode value',
            city: 'city value',
            country: 'new country',
            phone: 'phone value',
            email: 'email value',
            registered: 'registered value',
        });
        expect(data.setCountry).toBeCalledWith('new country');
    });

    it('should have setPhone method to change the state phone', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setPhone('new phone');
        expect(wrapper.state()).toEqual({
            object: 'object value',
            civility: 'civility value',
            firstname: 'firstname value',
            lastname: 'lastname value',
            addressMain: 'addressMain value',
            addressMore: 'addressMore value',
            postalCode: 'postalCode value',
            city: 'city value',
            country: 'country value',
            phone: 'new phone',
            email: 'email value',
            registered: 'registered value',
        });
        expect(data.setPhone).toBeCalledWith('new phone');
    });

    it('should have setEmail method to change the state email', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setEmail('new email');
        expect(wrapper.state()).toEqual({
            object: 'object value',
            civility: 'civility value',
            firstname: 'firstname value',
            lastname: 'lastname value',
            addressMain: 'addressMain value',
            addressMore: 'addressMore value',
            postalCode: 'postalCode value',
            city: 'city value',
            country: 'country value',
            phone: 'phone value',
            email: 'new email',
            registered: 'registered value',
        });
        expect(data.setEmail).toBeCalledWith('new email');
    });

    it('should have setRegistered method to change the state registered', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setRegistered('new registered');
        expect(wrapper.state()).toEqual({
            object: 'object value',
            civility: 'civility value',
            firstname: 'firstname value',
            lastname: 'lastname value',
            addressMain: 'addressMain value',
            addressMore: 'addressMore value',
            postalCode: 'postalCode value',
            city: 'city value',
            country: 'country value',
            phone: 'phone value',
            email: 'email value',
            registered: 'new registered',
        });
        expect(data.setRegistered).toBeCalledWith('new registered');
    });
});
