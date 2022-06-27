import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error TS(6142): Module './AppLogo' was resolved to '/home/guillaum... Remove this comment to see the full error message
import { AppLogo } from './AppLogo';
// @ts-expect-error TS(6142): Module '../icons/AmnestyLogo' was resolved to '/ho... Remove this comment to see the full error message
import AmnestyLogo from '../icons/AmnestyLogo';

describe('<AppLogo />', () => {
    const defaultProps = {
        context: {},
    };

    it('should display AmnestyLogo in correct color (taken from context)', () => {
        const props = {
            ...defaultProps,
            context: {
                logoColor: 'blue',
                logoBackgroundColor: 'red',
            },
        };

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = shallow(<AppLogo {...props} />);
        const logo = wrapper.find(AmnestyLogo);
        expect(logo.length).toEqual(1);
        expect(logo.prop('fill0')).toEqual('red');
        expect(logo.prop('fill1')).toEqual('blue');
    });
});
