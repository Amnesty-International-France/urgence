import React from 'react';
import { shallow } from 'enzyme';
import { AmnestyCandle } from './AmnestyCandle';

describe('<AmnestyCandle />', () => {
    it('should allow to change icon size', () => {
        const wrapper = shallow(<AmnestyCandle size={48} />);
        expect(wrapper.find('svg').prop('width')).toBe(48);
        expect(wrapper.find('svg').prop('height')).toBe(48);
    });

    it('should allow to change icon color', () => {
        const wrapper = shallow(<AmnestyCandle color="#fff" />);
        expect(wrapper.find('svg').prop('fill')).toBe('#fff');
    });
});
