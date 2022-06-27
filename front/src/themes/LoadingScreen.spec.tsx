import React from 'react';
import { shallow } from 'enzyme';

import { LoadingScreen } from './LoadingScreen';

describe('<LoadingScreen />', () => {
    const defaultProps = {
        className: '',
    };

    it('should display Amnesty logo', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<LoadingScreen {...props} />);
        expect(wrapper.find('AmnestyCandle').length).toBe(1);
    });
});
