import React from 'react';
import { shallow } from 'enzyme';

import { Story } from './Story';

const defaultStep = {
    content: '',
    displayOptions: {
        mediumPosition: 'top',
        backgroundColor: 'red',
    },
};

describe('<Story />', () => {
    const defaultProps = {
        story: [defaultStep],
        loading: false,
    };

    it('should display a loading message while loading', () => {
        const props = { ...defaultProps, loading: true };
        const wrapper = shallow(<Story {...props} />);

        const loading = wrapper.find('.loading');
        expect(loading.length).toBe(1);
    });

    it('should display a 404 message if story has no configured step', () => {
        const test = (story, shouldBeErred) => {
            const props = { ...defaultProps, story };
            const wrapper = shallow(<Story {...props} />);

            const error = wrapper.find('.error');
            expect(error.length > 0).toBe(shouldBeErred);
        };

        test(null, true);
        test(undefined, true);
        test([], true);
        test([defaultStep], false);
    });

    it('display a carousel with all story steps', () => {
        const props = {
            ...defaultProps,
            story: [
                { ...defaultStep, content: 'Hello' },
                { ...defaultStep, content: 'World' },
            ],
        };
        const wrapper = shallow(<Story {...props} />);

        const slider = wrapper.find('glamorous(Carousel)');

        expect(slider.childAt(0).prop('content')).toBe('Hello');
        expect(slider.childAt(1).prop('content')).toBe('World');
    });
});
