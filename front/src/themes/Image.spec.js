import React from 'react';
import { shallow } from 'enzyme';

import { Image } from './Image';

describe('<Image />', () => {
    it('should render a div with correct background image and title', () => {
        const wrapper = shallow(<Image src="/foo.jpg" title="Hello!" />);
        const image = wrapper.find('div');

        expect(image.prop('style').backgroundImage).toContain('/foo.jpg');
        expect(image.prop('title')).toBe('Hello!');
    });
});
