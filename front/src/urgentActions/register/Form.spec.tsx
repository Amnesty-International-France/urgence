import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error TS(6142): Module '../../themes/Input' was resolved to '/home... Remove this comment to see the full error message
import Input from '../../themes/Input';
// @ts-expect-error TS(6142): Module '../../themes/RichText' was resolved to '/h... Remove this comment to see the full error message
import RichText from '../../themes/RichText';
// @ts-expect-error TS(6142): Module '../../themes/RadioButton' was resolved to ... Remove this comment to see the full error message
import RadioButton from '../../themes/RadioButton';

// @ts-expect-error TS(6142): Module './Form' was resolved to '/home/guillaume/d... Remove this comment to see the full error message
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
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = shallow(<Form {...defaultProps} />);

        const inputs = wrapper.find(Input);

        expect(inputs.length).toBe(4);

        expect(inputs.at(0).prop('className')).toBe('firstname');
        expect(inputs.at(0).prop('label')).toBe(`Votre prénom *`);

        expect(inputs.at(1).prop('className')).toBe('lastname');
        expect(inputs.at(1).prop('label')).toBe(`Votre nom *`);

        expect(inputs.at(2).prop('className')).toBe('email');
        expect(inputs.at(2).prop('label')).toBe(`Votre adresse e-mail *`);

        expect(inputs.at(3).prop('className')).toBe('phone');
        expect(inputs.at(3).prop('label')).toBe(`Votre téléphone mobile *`);
    });

    it('display a radio button', () => {
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = shallow(<Form {...defaultProps} />);

        const radio = wrapper.find(RadioButton);

        expect(radio.at(0).prop('label')).toBe('Civilité *');
    });

    it('display a rich text for phone indication', () => {
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = shallow(<Form {...defaultProps} />);

        const richText = wrapper.find(RichText);

        expect(richText.length).toBe(1);
        expect(richText.at(0).prop('className')).toBe('phone-indication');
    });
});
