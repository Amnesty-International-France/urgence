import React from 'react';
import { mount } from 'enzyme';

import { StorySlide } from './StorySlide';

describe('<StorySlide />', () => {
    const defaultProps = {
        step: {
            content: 'I am content',
        },
        index: 3,
        total: 6,
        children: jest.fn().mockReturnValue([
            <div key="1" className="my-child">
                1
            </div>,
        ]),
    };

    it('should pass the step to its children', () => {
        const wrapper = mount(<StorySlide {...defaultProps} />);

        const storyStep = wrapper.find('.story-step');
        expect(storyStep.length).toBe(1);

        expect(defaultProps.children).toHaveBeenCalledWith({
            content: 'I am content',
        });

        const myChild = storyStep.find('.my-child');
        expect(myChild.length).toBe(1);
    });
});
