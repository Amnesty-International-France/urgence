import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { mount } from 'enzyme';

// @ts-expect-error TS(6142): Module './StorySlide' was resolved to '/home/guill... Remove this comment to see the full error message
import { StorySlide } from './StorySlide';

describe('<StorySlide />', () => {
    const defaultProps = {
        step: {
            content: 'I am content',
        },
        index: 3,
        total: 6,
        children: jest.fn().mockReturnValue([
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div key="1" className="my-child">
                1
            </div>,
        ]),
    };

    it('should pass the step to its children', () => {
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = mount(<StorySlide {...defaultProps} />);

        const storyStep = wrapper.find('.story-step');
        expect(storyStep.length).toBe(1);

        expect(defaultProps.children).toHaveBeenCalledWith({
            content: 'I am content',
        });
    });
});
