import React from 'react';
import { shallow } from 'enzyme';

import Input from '../../themes/Input';
import RichText from '../../themes/RichText';
import RadioButton from '../../themes/RadioButton';

import Form from './Form';

describe('Form', () => {
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

    it('display all inputs', () => {
        const wrapper = shallow(<Form {...defaultProps} />);

        const inputs = wrapper.find(Input);

        expect(inputs.length).toBe(4);

        expect(inputs.at(0).prop('className')).toBe('firstname');
        expect(inputs.at(0).prop('label')).toBe(`Votre prénom *`);

        expect(inputs.at(0).prop('className')).toBe('lastname');
        expect(inputs.at(0).prop('label')).toBe(`Votre nom *`);

        expect(inputs.at(0).prop('className')).toBe('email');
        expect(inputs.at(0).prop('label')).toBe(`Votre adresse e-mail *`);

        expect(inputs.at(0).prop('className')).toBe('phone');
        expect(inputs.at(0).prop('label')).toBe(`Votre téléphone mobile *`);
    });

    it('display a radio button', () => {
        const wrapper = shallow(<Form {...defaultProps} />);

        const radio = wrapper.find(RadioButton);

        expect(radio.at(0).prop('label')).toBe('Civilité *');
    });

    it('display a rich text for phone indication', () => {
        const wrapper = shallow(<Form {...defaultProps} />);

        const richText = wrapper.find(RichText);

        expect(richText.length).toBe(1);
        expect(richText.at(0).prop('className')).toBe('phone-indication');
    });
});
