import React from 'react';
import { shallow } from 'enzyme';

import { RichText } from 'amnesty-components';
import LegalInformation from '../LegalInformation';
import { MessageSend } from './MessageSend';
import Form from './Form';

describe('MessageSend', () => {
    const defaultStep = [{ value: 'one' }, { value: 'two' }, { value: 'three' }];
    const defaultProps = {
        text: 'text',
        messageTemplate: defaultStep,
        recipient: {
            mail: 'mail',
        },
        loading: false,
        match: { params: {} },
        history: { push: () => null },
    };

    it('should display a 404 message', () => {
        const test = (messageTemplate: any, shouldBeErred: any) => {
            const props = { ...defaultProps, messageTemplate };
            const wrapper = shallow(<MessageSend {...props} />);

            const error = wrapper.find('.error');
            expect(error.length > 0).toBe(shouldBeErred);
        };

        test(null, true);
        test(undefined, true);
        test([], true);
        test([defaultStep], false);
    });

    it('should display <LegalInformation />', () => {
        const wrapper = shallow(<MessageSend {...defaultProps} />);

        const legalInformation = wrapper.find(LegalInformation);
        expect(legalInformation.length).toBe(1);
    });

    it('should display a <Form />', () => {
        const wrapper = shallow(<MessageSend {...defaultProps} />);

        const form = wrapper.find(Form);
        expect(form.length).toBe(1);
    });

    it('should display a <RichText />', () => {
        const wrapper = shallow(<MessageSend {...defaultProps} />);

        const text = wrapper.find(RichText);
        expect(text.length).toBe(1);
    });
});
