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
        data.getAddressMain.mockImplementation(() => 'addressmain value');
        data.getAddressMore.mockImplementation(() => 'addressmore value');
        data.getPostalCode.mockImplementation(() => 'postalcode value');
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
        });
        expect(data.setMailObject).toBeCalledWith('new object');
    });

    it('should have setCivility method to change the state object', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setCivility('new civility');
        expect(wrapper.state()).toEqual({
            object: 'object value',
            civility: 'new civility',
            firstname: 'firstname value',
            lastname: 'lastname value',
        });
        expect(data.setCivility).toBeCalledWith('new civility');
    });

    it('should have setFirstname method to change the state object', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setFirstname('new firstname');
        expect(wrapper.state()).toEqual({
            object: 'object value',
            civility: 'civility value',
            firstname: 'new firstname',
            lastname: 'lastname value',
        });
        expect(data.setSurname).toBeCalledWith('new firstname');
    });

    it('should have setLastname method to change the state object', () => {
        const wrapper = shallow(<DataProvider>OK</DataProvider>);
        wrapper.instance().setLastname('new lastname');
        expect(wrapper.state()).toEqual({
            object: 'object value',
            civility: 'civility value',
            firstname: 'firstname value',
            lastname: 'new lastname',
        });
        expect(data.setName).toBeCalledWith('new lastname');
    });
});
