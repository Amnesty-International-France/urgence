import React from 'react';
import { shallow, mount } from 'enzyme';

import { Input, isCorrectEmail } from './Input';

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
});
