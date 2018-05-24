import React from 'react';
import { shallow } from 'enzyme';

import { SessionDataProvider } from './SessionDataContext';
import sessionData from './sessionData';

jest.mock('./sessionData.js');

describe('SessionDataContext', () => {
    sessionData.getMailObject.mockImplementation(() => 'object value');
    sessionData.getSignature.mockImplementation(() => 'signature value');

    it('should have state from sessionData', () => {
        const wrapper = shallow(<SessionDataProvider>OK</SessionDataProvider>);
        expect(wrapper.state()).toEqual({ object: 'object value', signature: 'signature value' });
    });

    it('should have have method to change state.object', () => {
        const wrapper = shallow(<SessionDataProvider>OK</SessionDataProvider>);
        wrapper.instance().setObject('new object');
        expect(wrapper.state()).toEqual({ object: 'new object', signature: 'signature value' });
        expect(sessionData.setMailObject).toBeCalledWith('new object');
    });

    it('should have have method to change the state object', () => {
        const wrapper = shallow(<SessionDataProvider>OK</SessionDataProvider>);
        wrapper.instance().setSignature('new signature');
        expect(wrapper.state()).toEqual({ object: 'object value', signature: 'new signature' });
        expect(sessionData.setSignature).toBeCalledWith('new signature');
    });
});
