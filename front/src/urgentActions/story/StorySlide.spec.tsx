import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
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
    });
});
