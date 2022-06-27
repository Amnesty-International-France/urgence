import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import { Image } from './Image';

describe('<Image />', () => {
    it('should render a div with correct background image and title', () => {
        const wrapper = shallow(
            <Image src="http://localhost:4000/static/foo.jpg" title="Hello!" />,
        );
        const image = wrapper.find('div');

        expect(image.prop('style').backgroundImage).toBe(
            'url(http://localhost:4000/static/foo.jpg)',
        );
        expect(image.prop('title')).toBe('Hello!');
    });

    it('should render a div with correct background image and title if src is a just uploaded File image', () => {
        const src = {
            rawFile: {
                preview: 'http://localhost:4000/static/foo.jpg',
            },
        };
        const wrapper = shallow(<Image src={src} title="Hello!" />);
        const image = wrapper.find('div');

        expect(image.prop('style').backgroundImage).toBe(
            'url(http://localhost:4000/static/foo.jpg)',
        );
        expect(image.prop('title')).toBe('Hello!');
    });
});
