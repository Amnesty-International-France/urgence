import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
import { InputAdornment } from '@material-ui/core';

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
