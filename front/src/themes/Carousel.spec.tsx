import React from 'react';
import { mount, shallow } from 'enzyme';
import Swiper from 'swiper/js/swiper.js';
import { Carousel } from './Carousel';

jest.mock('swiper');

describe('<Carousel />', () => {
    const defaultProps = {
        className: 'class',
        children: jest.fn().mockReturnValue([<div key="1">1</div>]),
        initialSlide: 3,
    };

    const swiperInstance = {
        slideNext: jest.fn(),
        destroy: jest.fn(),
    };

    beforeEach(() => {
        Swiper.mockImplementation(() => swiperInstance);
    });

    it('should call children renderProps with instance nextSlide', () => {
        const props = { ...defaultProps };
        shallow(<Carousel {...props} current={1} total={3} />);
        expect(defaultProps.children).toHaveBeenCalled();
    });

    it('should include rightControl if current < total', () => {
        const props = { ...defaultProps };
        const wrapper = mount(<Carousel current={1} total={3} {...props} />);
        const rightControl = wrapper.find('.swiper-controls.right');
        expect(rightControl.length).toBe(1);
    });

    it('should include leftControl if current > 1', () => {
        const props = { ...defaultProps };
        const wrapper = mount(<Carousel current={2} total={3} {...props} />);
        const leftControl = wrapper.find('.swiper-controls.left');
        expect(leftControl.length).toBe(1);
    });

    it('should not include leftControl if current > 1', () => {
        const props = { ...defaultProps };
        const wrapper = mount(<Carousel current={1} total={3} {...props} />);
        const leftControl = wrapper.find('.swiper-controls.left');
        expect(leftControl.length).toBe(0);
    });
});
