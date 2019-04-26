import React from 'react';
import { shallow } from 'enzyme';

import { Input, isCorrectEmail } from './Input';

describe('<Input />', () => {
    it('should render a div with correct background image and title', () => {
        const wrapper = shallow(
            <Input value="value" label="Title" match={{ params: { id: 0 } }} />,
        );
        const input = wrapper.find('TextField');

        expect(input.prop('value')).toBe('value');
        expect(input.prop('label')).toBe('Title');
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
