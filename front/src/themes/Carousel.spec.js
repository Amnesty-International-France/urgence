import React from 'react';
import { shallow } from 'enzyme';
import Swiper from 'swiper';

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

    it('should instanciate and bind swiper to component', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<Carousel {...props} />);
        wrapper.instance().initSlider('carouselEl');
        expect(Swiper).toHaveBeenCalled();
        wrapper.instance().nextSlide();
        expect(swiperInstance.slideNext).toHaveBeenCalled();
        expect(Swiper.mock.calls[0][0]).toBe('carouselEl');
        expect(Swiper.mock.calls[0][1].initialSlide).toBe(3);
        wrapper.instance().componentWillUnmount();
        expect(swiperInstance.destroy).toHaveBeenCalled();
    });

    it('should call children renderProps with instance nextSlide', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<Carousel {...props} />);
        expect(defaultProps.children).toHaveBeenCalledWith({
            nextSlide: wrapper.instance().nextSlide,
        });
    });
});
