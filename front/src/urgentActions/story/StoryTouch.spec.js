import React from 'react';
import { mount } from 'enzyme';

import { StoryTouch } from './StoryTouch';

describe('<StoryTouch />', () => {
    const defaultProps = {
        slidePrevious: jest.fn(),
        slideNext: jest.fn(),
    };

    it('should render a story touch component', () => {
        const wrapper = mount(<StoryTouch {...defaultProps} />);
        const storyTouch = wrapper.find('.story-touch');
        expect(storyTouch.length).toBe(1);
    });
});
