import React from 'react';
import { shallow } from 'enzyme';

import RichText from '../../themes/RichText';
import { Send } from './Send';
import Form from './Form';

describe('Send', () => {
    const defaultStep = [{ value: 'one' }, { value: 'two' }, { value: 'three' }];
    const defaultProps = {
        text: 'text',
        objectIndication: 'object indication',
        messageTemplate: defaultStep,
        recipient: {
            mail: 'mail',
        },
        loading: false,
        match: { params: {} },
        history: { push: () => null },
    };

    it('should display a 404 message', () => {
        const test = (messageTemplate, shouldBeErred) => {
            const props = { ...defaultProps, messageTemplate };
            const wrapper = shallow(<Send {...props} />);

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

    it('display a rich text', () => {
        const wrapper = shallow(<Message {...defaultProps} />);

        const text = wrapper.find(RichText);
        expect(text.length).toBe(1);
    });
});
