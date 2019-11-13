import React from 'react';
import { shallow } from 'enzyme';

import { Message } from './Message';
import LetterView from './LetterView';
import Form from './Form';

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

    it('display a letter', () => {
        const wrapper = shallow(<Message {...defaultProps} />);

        const letter = wrapper.find(LetterView);
        expect(letter.length).toBe(1);
    });

    it('display a form', () => {
        const wrapper = shallow(<Message {...defaultProps} />);

        const form = wrapper.find(Form);
        expect(form.length).toBe(1);
    });
});
