import React from 'react';
import { shallow } from 'enzyme';

import { MessageSection } from './MessageSection';

describe('<MessageSection />', () => {
    const defaultProps = {
        content: 'Abdolfatah Soltani is a Human Rights Iranian lawyer.',
    };

    it('should display step content as HTML', () => {
        const props = {
            ...defaultProps,
            content: '<p>Hello world!</p>',
        };

        const wrapper = shallow(<MessageSection {...props} />);
        const richText = wrapper.find('RichText');
        expect(richText.prop('html')).toBe('<p>Hello world!</p>');
    });
});
