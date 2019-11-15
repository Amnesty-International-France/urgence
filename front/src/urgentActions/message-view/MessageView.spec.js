import React from 'react';
import { shallow } from 'enzyme';

import RichText from '../../themes/RichText';
import { Message } from './Message';
import LetterView from './LetterView';
import Form from './Form';

describe('Message', () => {
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

    it('should display a 404 message if there is no message template', () => {
        const test = (messageTemplate, shouldBeErrored) => {
            const props = { ...defaultProps, messageTemplate };
            const wrapper = shallow(<Message {...props} />);

            const error = wrapper.find('.error');
            expect(error.length > 0).toBe(shouldBeErrored);
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
