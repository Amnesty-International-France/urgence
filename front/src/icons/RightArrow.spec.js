import React from 'react';
import { shallow } from 'enzyme';
import { RightArrow } from './RightArrow';

describe('<RightArrow />', () => {
    it('should allow to change icon size', () => {
        const wrapper = shallow(<RightArrow size={48} />);
        expect(wrapper.find('svg').prop('width')).toBe(48);
        expect(wrapper.find('svg').prop('height')).toBe(48);
    });

    it('should allow to change icon color', () => {
        const wrapper = shallow(<RightArrow color="#fff" />);
        expect(wrapper.find('svg').prop('fill')).toBe('#fff');
    });
});
