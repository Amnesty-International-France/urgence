import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error TS(6142): Module './LoadingScreen' was resolved to '/home/gu... Remove this comment to see the full error message
import { LoadingScreen } from './LoadingScreen';

describe('<LoadingScreen />', () => {
    const defaultProps = {
        className: '',
    };

    it('should display Amnesty logo', () => {
        const props = { ...defaultProps };
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = shallow(<LoadingScreen {...props} />);
        expect(wrapper.find('AmnestyCandle').length).toBe(1);
    });
});
