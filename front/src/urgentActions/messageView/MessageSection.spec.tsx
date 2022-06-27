import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
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
