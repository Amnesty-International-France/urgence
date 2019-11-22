import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';

import { Story } from './Story';
import Carousel from '../../themes/Carousel';

const defaultStep = {
    id: '1',
    content: '',
    displayOptions: {
        mediumPosition: 'bottom',
        backgroundColor: 'red',
    },
};

jest.mock('react-router-dom');

describe('<Story />', () => {
    const defaultProps = {
        context: {
            changeLogoColor: () => {},
        },
        story: [defaultStep],
        loading: false,
        match: {
            params: {
                slug: 'you-are-my-only-hope',
                page: 0,
            },
        },
        history: { push: () => null },
    };

    it('should display a 404 message if story has no configured step', () => {
        const test = story => {
            const props = { ...defaultProps, story };
            const wrapper = shallow(<Story {...props} />);

            const redirect = wrapper.find(Redirect);
            expect(redirect.length).toEqual(1);
            expect(redirect.prop('to')).toEqual('/error');
        };

        test(null, true);
        test(undefined, true);
        test([], true);
    });

    it('should display a 404 message if story step is wrong', () => {
        const props = {
            ...defaultProps,
            story: [{ ...defaultStep }],
            match: {
                params: {
                    slug: 'you-are-my-only-hope',
                    page: 34,
                },
            },
        };
        const wrapper = shallow(<Story {...props} />);

        const redirect = wrapper.find(Redirect);
        expect(redirect.length).toEqual(1);
        expect(redirect.prop('to')).toEqual('/error');
    });

    it('display a carousel with all story steps as children render props', () => {
        const props = {
            ...defaultProps,
            story: [
                { ...defaultStep, id: '1', content: 'Cover' },
                { ...defaultStep, id: '2', content: 'Hello' },
                { ...defaultStep, id: '3', content: 'World' },
            ],
        };

        const wrapper = shallow(<Story {...props} />);
        const carousel = wrapper.find(Carousel);
        const renderProp = carousel.prop('children')();
        const children = renderProp.props.children;

        expect(children[0].props.step).toEqual(props.story[0]);
        expect(children[1][0].props.step).toEqual(props.story[1]);
        expect(children[1][1].props.step).toEqual(props.story[2]);
    });
});
