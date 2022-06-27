import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
import { InputAdornment } from '@material-ui/core';

// @ts-expect-error TS(6142): Module './CheckAdornment' was resolved to '/home/g... Remove this comment to see the full error message
import { CheckAdornment } from './CheckAdornment';

describe('<CheckAdornment />', () => {
    it('should render a check icon if there is no error', () => {
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = shallow(<CheckAdornment className="salut" isValid={true} />);
        expect(wrapper.isEmptyRender()).toBe(false);

        const adornment = wrapper.find(InputAdornment);
        expect(adornment.prop('position')).toBe('end');
        expect(adornment.childAt(0).prop('className')).toBe('check');
    });

    it('should render null if there is an error', () => {
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = shallow(<CheckAdornment className="salut" isValid={false} />);
        expect(wrapper.isEmptyRender()).toBe(true);
    });
});
