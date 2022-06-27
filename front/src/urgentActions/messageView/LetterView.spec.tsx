import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { mount } from 'enzyme';

import LetterView from './LetterView';
import MessageSection from './MessageSection';

describe('LetterView', () => {
    const defaultStep = [{ value: 'one' }, { value: 'two' }, { value: 'three' }];
    const defaultProps = {
        messageTemplate: defaultStep,
        objectIndication: 'object indication',
        objectExample: 'object example',
        loading: false,
        match: { params: {} },
        history: { push: () => null },
        recipient: {
            mail: 'mail',
        },
    };

    it('display all messageTemplate steps', () => {
        const wrapper = mount(<LetterView {...defaultProps} />);

        const messages = wrapper.find(MessageSection);

        expect(messages.at(0).prop('content')).toBe('one');
        expect(messages.at(1).prop('content')).toBe('two');
        expect(messages.at(2).prop('content')).toBe('three');
    });
});
