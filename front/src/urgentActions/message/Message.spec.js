import React from 'react';
import { shallow } from 'enzyme';

import { Message } from './Message';

describe('Message', () => {
    const defaultStep = [
        { value: 'one' },
        { value: 'two' },
        { value: 'three' },
    ];
    const defaultProps = {
        messageTemplate: defaultStep,
        objectIndication: 'object indication',
        loading: false,
        match: { params: {} },
        history: { push: () => null },
    };

    it('should display a loading message while loading', () => {
        const props = { ...defaultProps, loading: true };
        const wrapper = shallow(<Message {...props} />);

        const loading = wrapper.find('.loading');
        expect(loading.length).toBe(1);
    });

    it('should display a 404 message if story has no message step', () => {
        const test = (messageTemplate, shouldBeErred) => {
            const props = { ...defaultProps, messageTemplate };
            const wrapper = shallow(<Message {...props} />);

            const error = wrapper.find('.error');
            expect(error.length > 0).toBe(shouldBeErred);
        };

        test(null, true);
        test(undefined, true);
        test([], true);
        test([defaultStep], false);
    });

    it('display a carousel with all messageTemplate steps', () => {
        const wrapper = shallow(<Message {...defaultProps} />);

        const slider = wrapper.find('glamorous(Carousel)');

        expect(slider.childAt(0).prop('content')).toBe('one');
        expect(slider.childAt(1).prop('content')).toBe('two');
        expect(slider.childAt(2).prop('content')).toBe('three');
    });

    it('display a carousel with last child being objectStep with objectIndication', () => {
        const wrapper = shallow(<Message {...defaultProps} />);

        const slider = wrapper.find('glamorous(Carousel)');

        expect(slider.childAt(3).prop('objectIndication')).toBe(
            'object indication',
        );
    });
});
