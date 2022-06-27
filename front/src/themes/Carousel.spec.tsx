import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { mount, shallow } from 'enzyme';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'swip... Remove this comment to see the full error message
import Swiper from 'swiper/js/swiper.js';
// @ts-expect-error TS(6142): Module './Carousel' was resolved to '/home/guillau... Remove this comment to see the full error message
import { Carousel } from './Carousel';

jest.mock('swiper');

describe('<Carousel />', () => {
    const defaultProps = {
        className: 'class',
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        shallow(<Carousel {...props} current={1} total={3} />);
        expect(defaultProps.children).toHaveBeenCalled();
    });

    it('should include rightControl if current < total', () => {
        const props = { ...defaultProps };
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = mount(<Carousel current={1} total={3} {...props} />);
        const rightControl = wrapper.find('.swiper-controls.right');
        expect(rightControl.length).toBe(1);
    });

    it('should include leftControl if current > 1', () => {
        const props = { ...defaultProps };
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = mount(<Carousel current={2} total={3} {...props} />);
        const leftControl = wrapper.find('.swiper-controls.left');
        expect(leftControl.length).toBe(1);
    });

    it('should not include leftControl if current > 1', () => {
        const props = { ...defaultProps };
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = mount(<Carousel current={1} total={3} {...props} />);
        const leftControl = wrapper.find('.swiper-controls.left');
        expect(leftControl.length).toBe(0);
    });
});
