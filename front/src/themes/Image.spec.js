import React from 'react';
import { shallow } from 'enzyme';

import { Image } from './Image';

describe('<Image />', () => {
    it('should render an image with correct URL, alt, and title', () => {
        const wrapper = shallow(<Image src="/foo.jpg" title="Hello!" />);
        const image = wrapper.find('img');

        expect(image.prop('src')).toBe('/foo.jpg');
        expect(image.prop('title')).toBe('Hello!');
        expect(image.prop('alt')).toBe('Hello!');
    });
});
