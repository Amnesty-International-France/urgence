import React from 'react';
import { shallow } from 'enzyme';

import { AppLogo } from './AppLogo';

describe('<AppLogo />', () => {
    const defaultProps = {
        context: {},
    };

    it('should display Amnesty Candle in correct color (taken from context)', () => {
        const props = {
            ...defaultProps,
            context: {
                logoColor: 'blue',
            },
        };

        const wrapper = shallow(<AppLogo {...props} />);
        expect(wrapper.find('AmnestyCandle').prop('color')).toBe('blue');
    });
});
