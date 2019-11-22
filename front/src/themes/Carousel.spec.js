import React from 'react';
import { shallow } from 'enzyme';
import Swiper from 'swiper/js/swiper.js';

import { Carousel } from './Carousel';

jest.mock('swiper');

const wait = duration => new Promise(resolve => setTimeout(resolve, duration));

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

    it('should instanciate and bind swiper to component', async () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<Carousel current={1} total={3} {...props} />);
        wrapper.instance().componentDidMount();
        expect(Swiper).toHaveBeenCalled();
        wrapper.instance().slide();
        expect(swiperInstance.slideNext).toHaveBeenCalled();
        expect(Swiper.mock.calls[0][1].initialSlide).toBe(3);
        wrapper.instance().componentWillUnmount();
        await wait(100);
        expect(swiperInstance.destroy).toHaveBeenCalled();
    });

    it('should call children renderProps with instance nextSlide', () => {
        const props = { ...defaultProps };
        shallow(<Carousel {...props} current={1} total={3} />);
        expect(defaultProps.children).toHaveBeenCalled();
    });

    it('should include next-arrow if current < total', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<Carousel current={1} total={3} {...props} />);
        expect(wrapper.find('.next-arrow').length).toEqual(1);
        expect(wrapper.find('.last-arrow').length).toEqual(0);
    });

    it('should include last-arrow if current === total', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<Carousel current={3} total={3} {...props} />);
        expect(wrapper.find('.next-arrow').length).toEqual(0);
        expect(wrapper.find('.last-arrow').length).toEqual(1);
    });
});
