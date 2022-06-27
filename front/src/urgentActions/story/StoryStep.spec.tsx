import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import { StoryStep } from './StoryStep';

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
