import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import Input from '../../themes/Input';
import RichText from '../../themes/RichText';

import Form from './Form';

describe('Form', () => {
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

    it('display all inputs', () => {
        const wrapper = shallow(<Form {...defaultProps} />);

        const inputs = wrapper.find(Input);

        expect(inputs.length).toBe(1);

        expect(inputs.at(0).prop('className')).toBe('object');
    });

    it('display a rich text for object indication', () => {
        const wrapper = shallow(<Form {...defaultProps} />);

        const richText = wrapper.find(RichText);

        expect(richText.length).toBe(1);
        expect(richText.at(0).prop('className')).toBe('object-indication');
    });
});
