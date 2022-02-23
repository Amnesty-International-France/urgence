import React from 'react';
import { shallow, mount } from 'enzyme';

import { Input, isCorrectEmail, isCorrectPhone } from './Input';

describe('<Input />', () => {
    it('should render an Input with correct value and label', () => {
        const wrapper = shallow(
            <Input value="value" label="Title" match={{ params: { slug: 'im-a-slug' } }} />,
        );
        const input = wrapper.find('TextField');

        expect(input.prop('value')).toBe('value');
        expect(input.prop('label')).toBe('Title');
    });

    it('should render an Adornment if there is no error', () => {
        const wrapper = shallow(
            <Input
                value="value"
                label="Title"
                match={{ params: { slug: 'im-a-slug' } }}
                error={false}
            />,
        );
        const input = wrapper.find('TextField');
        const InputProps = input.prop('InputProps');

        const wrapperAdornment = mount(InputProps.endAdornment);
        expect(wrapperAdornment.childAt(0).isEmptyRender()).toBe(false);
    });

    it('should render no Adornment if there is an error', () => {
        const wrapper = shallow(
            <Input
                value="value"
                label="Title"
                match={{ params: { slug: 'im-a-slug' } }}
                error={true}
            />,
        );
        const input = wrapper.find('TextField');
        const InputProps = input.prop('InputProps');

        const wrapperAdornment = mount(InputProps.endAdornment);
        expect(wrapperAdornment.childAt(0).isEmptyRender()).toBe(true);
    });
});

describe('isCorrectEmail', () => {
    it('should return false if missing @', () => {
        const text = 'abel.chemoul.com';

        expect(isCorrectEmail(text)).toBe(false);
    });

    it('should return false if missing dot part', () => {
        const text = 'abel@chemoul';

        expect(isCorrectEmail(text)).toBe(false);
    });

    it('should return true if correct email', () => {
        const text = 'abel@chemoul.com';

        expect(isCorrectEmail(text)).toBe(true);
    });

    it('should return true if correct phone', () => {
        const phone = '0600000000';
        const phone2 = '0700000000';
        const phone3 = '+33600000000';
        const phone4 = '+33700000000';
        const phone5 = '0033600000000';
        const phone6 = '0033700000000';

        expect(isCorrectPhone(phone)).toBe(true);
        expect(isCorrectPhone(phone2)).toBe(true);
        expect(isCorrectPhone(phone3)).toBe(true);
        expect(isCorrectPhone(phone4)).toBe(true);
        expect(isCorrectPhone(phone5)).toBe(true);
        expect(isCorrectPhone(phone6)).toBe(true);
    });

    it('should return false if incorrect phone', () => {
        const phone = '600000000';
        const phone2 = '0900000000';
        const phone3 = '+33800000000';
        const phone4 = '+330000000';
        const phone5 = '1033600000000';
        const phone6 = '0300000000';

        expect(isCorrectPhone(phone)).toBe(false);
        expect(isCorrectPhone(phone2)).toBe(false);
        expect(isCorrectPhone(phone3)).toBe(false);
        expect(isCorrectPhone(phone4)).toBe(false);
        expect(isCorrectPhone(phone5)).toBe(false);
        expect(isCorrectPhone(phone6)).toBe(false);
    });
});
