import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
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
