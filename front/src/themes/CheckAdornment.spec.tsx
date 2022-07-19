import React from 'react';
import { shallow } from 'enzyme';
import { InputAdornment } from '@mui/material';

import { CheckAdornment } from './CheckAdornment';

describe('<CheckAdornment />', () => {
    it('should render a check icon if there is no error', () => {
        const wrapper = shallow(<CheckAdornment className="salut" isValid={true} />);
        expect(wrapper.isEmptyRender()).toBe(false);

        const adornment = wrapper.find(InputAdornment);
        expect(adornment.prop('position')).toBe('end');
        expect(adornment.childAt(0).prop('className')).toBe('check');
    });

    it('should render null if there is an error', () => {
        const wrapper = shallow(<CheckAdornment className="salut" isValid={false} />);
        expect(wrapper.isEmptyRender()).toBe(true);
    });
});
