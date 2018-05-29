import React from 'react';
import { shallow } from 'enzyme';

import { StorySlide } from './StorySlide';
import StoryStep from './StoryStep';

describe('<StorySlide />', () => {
    const defaultProps = {
        step: {
            content: 'I am content',
            displayOptions: {
                mediumPosition: 'top',
                backgroundColor: 'yellow',
            },
        },
        index: 3,
        total: 6,
    };

    it('should render StoryStep with step props spread and hasActButton false', () => {
        const wrapper = shallow(<StorySlide {...defaultProps} />);
        const storyStep = wrapper.find(StoryStep);
        expect(storyStep.prop('content')).toBe('I am content');
        expect(storyStep.prop('displayOptions')).toEqual({
            mediumPosition: 'top',
            backgroundColor: 'yellow',
        });
    });

    it('should render StoryStep with hasActButton false if index differ from total', () => {
        const props = {
            ...defaultProps,
            index: 3,
            total: 6,
        };
        const wrapper = shallow(<StorySlide {...props} />);
        const storyStep = wrapper.find(StoryStep);
        expect(storyStep.prop('hasActButton')).toBe(false);
    });

    it('should render StoryStep with hasActButton true if index equal total', () => {
        const props = {
            ...defaultProps,
            index: 3,
            total: 3,
        };
        const wrapper = shallow(<StorySlide {...props} />);
        const storyStep = wrapper.find(StoryStep);
        expect(storyStep.prop('hasActButton')).toBe(true);
    });

    it('should add class with-bottom-media to .swiper-slide if mediumPosition is bottom', () => {
        const props = {
            ...defaultProps,
            step: {
                ...defaultProps.step,
                displayOptions: {
                    mediumPosition: 'bottom',
                },
            },
        };
        const wrapper = shallow(<StorySlide {...props} />);
        const swiperSlide = wrapper.find('.swiper-slide');
        expect(swiperSlide.prop('className')).toContain('with-bottom-media');
    });

    it('should not add class with-bottom-media to .swiper-slide if mediumPosition is top', () => {
        const props = {
            ...defaultProps,
            step: {
                ...defaultProps.step,
                displayOptions: {
                    mediumPosition: 'top',
                },
            },
        };
        const wrapper = shallow(<StorySlide {...props} />);
        const swiperSlide = wrapper.find('.swiper-slide');
        expect(swiperSlide.prop('className')).toBe('swiper-slide');
    });

    it('should render nextArrow if if index < total', () => {
        const props = {
            ...defaultProps,
            index: 3,
            total: 6,
        };
        const wrapper = shallow(<StorySlide {...props} />);
        const nextArrow = wrapper.find('.next-arrow');
        expect(nextArrow.length).toBe(1);
    });

    it('should not render nextArrow if if index >= total', () => {
        const props = {
            ...defaultProps,
            index: 6,
            total: 6,
        };
        const wrapper = shallow(<StorySlide {...props} />);
        const nextArrow = wrapper.find('.next-arrow');
        expect(nextArrow.length).toBe(0);
    });
});
