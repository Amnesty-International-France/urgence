import React from 'react';
import { shallow } from 'enzyme';

import { SessionDataProvider } from './SessionDataContext';
import data from './data';

jest.mock('./data');

describe('SessionDataContext', () => {
    beforeEach(() => {
        data.getMailObject.mockImplementation(() => 'object value');
        data.getCivility.mockImplementation(() => 'civility value');
        data.getSurname.mockImplementation(() => 'surname value');
        data.getName.mockImplementation(() => 'name value');
    });

    it('should have state from sessionData', () => {
        const wrapper = shallow(<SessionDataProvider>OK</SessionDataProvider>);
        expect(wrapper.state()).toEqual({
            object: 'object value',
            civility: 'civility value',
            surname: 'surname value',
            name: 'name value',
        });
    });

    it('should have setObject method to change state.object', () => {
        const wrapper = shallow(<SessionDataProvider>OK</SessionDataProvider>);
        wrapper.instance().setObject('new object');
        expect(wrapper.state()).toEqual({
            object: 'new object',
            civility: 'civility value',
            surname: 'surname value',
            name: 'name value',
        });
        expect(data.setMailObject).toBeCalledWith('new object');
    });

    it('should have setCivility method to change the state object', () => {
        const wrapper = shallow(<SessionDataProvider>OK</SessionDataProvider>);
        wrapper.instance().setCivility('new civility');
        expect(wrapper.state()).toEqual({
            object: 'object value',
            civility: 'new civility',
            surname: 'surname value',
            name: 'name value',
        });
        expect(data.setCivility).toBeCalledWith('new civility');
    });

    it('should have setSurname method to change the state object', () => {
        const wrapper = shallow(<SessionDataProvider>OK</SessionDataProvider>);
        wrapper.instance().setSurname('new surname');
        expect(wrapper.state()).toEqual({
            object: 'object value',
            civility: 'civility value',
            surname: 'new surname',
            name: 'name value',
        });
        expect(data.setSurname).toBeCalledWith('new surname');
    });

    it('should have setName method to change the state object', () => {
        const wrapper = shallow(<SessionDataProvider>OK</SessionDataProvider>);
        wrapper.instance().setName('new name');
        expect(wrapper.state()).toEqual({
            object: 'object value',
            civility: 'civility value',
            surname: 'surname value',
            name: 'new name',
        });
        expect(data.setName).toBeCalledWith('new name');
    });
});
