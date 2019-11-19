import React from 'react';
import { shallow } from 'enzyme';

import RichText from '../../themes/RichText';
import { MessageView } from './MessageView';
import LetterView from './LetterView';
import Form from './Form';

describe('MessageView', () => {
    const defaultStep = [{ value: 'one' }, { value: 'two' }, { value: 'three' }];
    const defaultProps = {
        text_view: 'text',
        button_view: 'button',
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
            const wrapper = shallow(<MessageView {...props} />);

            const error = wrapper.find('.error');
            expect(error.length > 0).toBe(shouldBeErrored);
        };

        test(null, true);
        test(undefined, true);
        test([], true);
        test([defaultStep], false);
    });

    it('display a letter', () => {
        const wrapper = shallow(<MessageView {...defaultProps} />);

        const letter = wrapper.find(LetterView);
        expect(letter.length).toBe(1);
    });

    it('display a form', () => {
        const wrapper = shallow(<MessageView {...defaultProps} />);

        const form = wrapper.find(Form);
        expect(form.length).toBe(1);
    });

    it('display a rich text', () => {
        const wrapper = shallow(<MessageView {...defaultProps} />);

        const text = wrapper.find(RichText);
        expect(text.length).toBe(1);
    });
});
