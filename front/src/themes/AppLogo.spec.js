import React from 'react';
import { shallow } from 'enzyme';

import { AppLogo } from './AppLogo';
import AmnestyLogo from '../icons/AmnestyLogo';

describe('<AppLogo />', () => {
    const defaultProps = {
        context: {},
    };

    it('should display AmnestyLogo in correct color (taken from context)', () => {
        const props = {
            ...defaultProps,
            context: {
                color: 'blue',
                backgroundColor: 'red',
            },
        };

        const wrapper = shallow(<AppLogo {...props} />);
        const logo = wrapper.find(AmnestyLogo);
        expect(logo.length).toEqual(1);
        expect(logo.prop('fill0')).toEqual('red');
        expect(logo.prop('fill1')).toEqual('blue');
    });
});
