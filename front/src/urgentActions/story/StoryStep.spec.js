import React from 'react';
import { shallow } from 'enzyme';

import { StoryStep } from './StoryStep';
import { white, black } from '../../themes/colors';

describe('<StoryStep />', () => {
    const defaultProps = {
        className: 'story-step',
        content: 'Abdolfatah Soltani is a Human Rights Iranian lawyer.',
    };

    it('should display step content as HTML', () => {
        const props = {
            ...defaultProps,
            content: '<p>Hello world!</p>',
        };

        const wrapper = shallow(<StoryStep {...props} />);
        const richText = wrapper.find('RichText');
        expect(richText.prop('html')).toBe('<p>Hello world!</p>');
    });
});
