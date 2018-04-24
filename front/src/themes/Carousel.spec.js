import React from 'react';
import { shallow } from 'enzyme';

import { Carousel } from './Carousel';

describe('<Carousel />', () => {
    const defaultProps = {
        children: [<div key="1">Foo</div>],
    };

    it('should not be infinite', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<Carousel {...props} />);
        const slider = wrapper.find('Slider');
        expect(slider.prop('infinite')).toBe(false);
    });
});
