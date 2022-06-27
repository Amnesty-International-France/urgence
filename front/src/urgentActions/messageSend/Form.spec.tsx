import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import Input from '../../themes/Input';
import RadioButton from '../../themes/RadioButton';

import Form from './Form';

describe('Form', () => {
    const defaultProps = {
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

        expect(inputs.at(0).prop('className')).toBe('firstname');
        expect(inputs.at(0).prop('label')).toBe(`Votre prénom *`);

        expect(inputs.at(1).prop('className')).toBe('lastname');
        expect(inputs.at(1).prop('label')).toBe(`Votre nom *`);

        expect(inputs.at(2).prop('className')).toBe('email');
        expect(inputs.at(2).prop('label')).toBe(`Votre adresse e-mail *`);
    });

    it('display a radio button', () => {
        const wrapper = shallow(<Form {...defaultProps} />);

        const radio = wrapper.find(RadioButton);

        expect(radio.at(0).prop('label')).toBe('Civilité *');
    });
});
