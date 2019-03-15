import React from 'react';
import { shallow } from 'enzyme';

import { SessionDataProvider } from './SessionDataContext';
import sessionData from './sessionData';

jest.mock('./sessionData.js');

describe('SessionDataContext', () => {
    beforeEach(() => {
        sessionData.getMailObject.mockImplementation(() => 'object value');
        sessionData.getCivility.mockImplementation(() => 'civility value');
        sessionData.getSurname.mockImplementation(() => 'surname value');
        sessionData.getName.mockImplementation(() => 'name value');
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
        expect(sessionData.setMailObject).toBeCalledWith('new object');
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
        expect(sessionData.setCivility).toBeCalledWith('new civility');
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
        expect(sessionData.setSurname).toBeCalledWith('new surname');
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
        expect(sessionData.setName).toBeCalledWith('new name');
    });
});
