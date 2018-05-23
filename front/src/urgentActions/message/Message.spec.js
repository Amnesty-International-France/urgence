import React from 'react';
import { shallow } from 'enzyme';

import { Message } from './Message';
import sessionData from '../../sessionData';

jest.mock('../../sessionData.js');

describe('Message', () => {
    const defaultStep = [{ value: 'one' }, { value: 'two' }, { value: 'three' }];
    const defaultProps = {
        messageTemplate: defaultStep,
        objectIndication: 'object indication',
        loading: false,
        match: { params: {} },
        history: { push: () => null },
        recipient: {
            mail: 'mail',
        },
    };

    it('should display a loading message while loading', () => {
        const props = { ...defaultProps, loading: true };
        const wrapper = shallow(<Message {...props} />);

        const loading = wrapper.find('.loading');
        expect(loading.length).toBe(1);
    });

    it('should display a 404 message if story has no message step', () => {
        const test = (messageTemplate, shouldBeErred) => {
            const props = { ...defaultProps, messageTemplate };
            const wrapper = shallow(<Message {...props} />);

            const error = wrapper.find('.error');
            expect(error.length > 0).toBe(shouldBeErred);
        };

        test(null, true);
        test(undefined, true);
        test([], true);
        test([defaultStep], false);
    });

    it('display a carousel with all messageTemplate steps', () => {
        const wrapper = shallow(<Message {...defaultProps} />);

        const slider = wrapper.find('glamorous(Carousel)');

        expect(slider.childAt(0).prop('content')).toBe('one');
        expect(slider.childAt(1).prop('content')).toBe('two');
        expect(slider.childAt(2).prop('content')).toBe('three');
    });

    it('display a carousel with before last child being objectStep with objectIndication and object from sessionData', () => {
        sessionData.getMailObject.mockImplementation(() => 'object value');
        const wrapper = shallow(<Message {...defaultProps} />);

        const slider = wrapper.find('glamorous(Carousel)');

        expect(slider.childAt(3).prop('objectIndication')).toBe('object indication');

        expect(slider.childAt(3).prop('object')).toBe('object value');
        expect(slider.childAt(3).prop('changeObject')).toBe(wrapper.instance().changeObject);
    });

    it('display a carousel with last child being signatureStep with signature from sessionData', () => {
        sessionData.getSignature.mockImplementation(() => 'signature value');
        const wrapper = shallow(<Message {...defaultProps} />);

        const slider = wrapper.find('glamorous(Carousel)');

        expect(slider.childAt(4).prop('signature')).toBe('signature value');
        expect(slider.childAt(4).prop('changeSignature')).toBe(wrapper.instance().changeSignature);
    });

    it('changeObject should call sessionData.setMailObject with event value', () => {
        const wrapper = shallow(<Message {...defaultProps} />);

        wrapper.instance().changeObject({ target: { value: 'value' } });
        expect(sessionData.setMailObject).toHaveBeenCalledWith('value');
    });

    it('changeSignature should call sessionData.setSignature with event value', () => {
        const wrapper = shallow(<Message {...defaultProps} />);

        wrapper.instance().changeSignature({ target: { value: 'value' } });
        expect(sessionData.setSignature).toHaveBeenCalledWith('value');
    });

    it('should instanciate SendMail and pass it to SignatureStep action prop', () => {
        sessionData.getMailObject.mockImplementation(() => 'object value');
        sessionData.getSignature.mockImplementation(() => 'signature value');
        const wrapper = shallow(<Message {...defaultProps} />);

        const slider = wrapper.find('glamorous(Carousel)');

        const action = slider.childAt(4).prop('action');

        expect(action.props.recipient).toBe(defaultProps.recipient);
        expect(action.props.messageTemplate).toBe(defaultStep);
        expect(action.props.object).toBe('object value');
        expect(action.props.signature).toBe('signature value');
    });
});
