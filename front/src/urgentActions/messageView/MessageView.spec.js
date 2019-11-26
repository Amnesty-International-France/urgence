import React from 'react';
import { shallow } from 'enzyme';

import RichText from '../../themes/RichText';
import { MessageView } from './MessageView';
import LetterView from './LetterView';
import Form from './Form';

describe('MessageView', () => {
    const defaultStep = [{ value: 'one' }, { value: 'two' }, { value: 'three' }];
    const defaultProps = {
        text: 'text',
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

    it('should display a <LetterView />', () => {
        const wrapper = shallow(<MessageView {...defaultProps} />);

        const letter = wrapper.find(LetterView);
        expect(letter.length).toBe(1);
    });

    it('should display a <Form />', () => {
        const wrapper = shallow(<MessageView {...defaultProps} />);

        const form = wrapper.find(Form);
        expect(form.length).toBe(1);
    });

    it('should display a <RichText />', () => {
        const wrapper = shallow(<MessageView {...defaultProps} />);

        const text = wrapper.find(RichText);
        expect(text.length).toBe(1);
    });
});
