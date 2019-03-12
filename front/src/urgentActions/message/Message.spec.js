import React from 'react';
import { shallow } from 'enzyme';

import { Message, LetterView } from './Message';
import MessageStep from './MessageStep';

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

    it('display all messageTemplate steps', () => {
        const wrapper = shallow(<LetterView {...defaultProps} />);

        const messages = wrapper.find(MessageStep);

        expect(messages.at(0).prop('content')).toBe('one');
        expect(messages.at(1).prop('content')).toBe('two');
        expect(messages.at(2).prop('content')).toBe('three');
    });
});
