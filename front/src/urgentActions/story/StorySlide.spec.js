import React from 'react';
import { shallow } from 'enzyme';

import { StorySlide } from './StorySlide';

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
        children: jest.fn().mockReturnValue([<div key="1">1</div>]),
    };

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
});
