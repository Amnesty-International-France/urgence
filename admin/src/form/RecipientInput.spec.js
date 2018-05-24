import React from 'react';
import { shallow } from 'enzyme';

import { RecipientInput, validateEmailsList } from './RecipientInput';

describe('<RecipientInput />', () => {
    const defaultProps = {
        classes: {},
        label: 'Recipient',
    };

    it('should display all required inputs', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<RecipientInput {...props} />);

        expect(wrapper.find('WithFormField[source="recipient.mail"]').length).toBe(1);
        expect(wrapper.find('WithFormField[source="recipient.copies_to"]').length).toBe(1);
        expect(wrapper.find('WithFormField[source="recipient.cci"]').length).toBe(1);
        expect(wrapper.find('WithFormField[source="recipient.postal_address"]').length).toBe(1);
    });
});

describe('validateEmailsList', () => {
    it('should not return error for empty list of emails', () => {
        expect(validateEmailsList('')).toBe(null);
    });

    it('should not return error on correct emails list', () => {
        expect(validateEmailsList('john.doe@acme.com')).toBe(null);
        expect(validateEmailsList('john.doe@acme.com,bob.smith@acme.com')).toBe(null);
    });

    it('should return an error if an email is invalid in given list', () => {
        expect(validateEmailsList('john.doe acme.com')).toBe(
            'Must contain only emails separated by a comma.',
        );
        expect(validateEmailsList('john.doe@acme.com,bob.smith acme.com')).toBe(
            'Must contain only emails separated by a comma.',
        );
    });
});
