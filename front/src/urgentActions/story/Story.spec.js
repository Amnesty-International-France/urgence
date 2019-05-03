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

    it('pass index props to carousel children', () => {
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
        expect(children[0].props.index).toEqual(0);
        expect(children[1][0].props.index).toEqual(1);
        expect(children[1][1].props.index).toEqual(2);
    });

    describe('After Switching Slide', () => {
        it('should update logo color in context', () => {
            const props = {
                ...defaultProps,
                story: [
                    { ...defaultStep, id: 1, displayOptions: { backgroundColor: 'white' } },
                    { ...defaultStep, id: 2, displayOptions: { backgroundColor: 'black' } },
                    { ...defaultStep, id: 3, displayOptions: { backgroundColor: 'black' } },
                ],
                context: {
                    changeLogoColor: jest.fn(),
                },
            };

            const wrapper = shallow(<Story {...props} />);
            const carousel = wrapper.find(Carousel);
            const afterChange = carousel.prop('afterChange');

            afterChange(1);

            expect(props.context.changeLogoColor).toHaveBeenCalledWith('#fff');
        });
    });

    it('should set correct logo color when receiving a new story', () => {
        const props = {
            ...defaultProps,
            match: {
                params: {
                    page: 0,
                },
            },
            context: {
                changeLogoColor: jest.fn(),
            },
            story: null,
        };

        const wrapper = shallow(<Story {...props} />);
        wrapper.setProps({
            ...props,
            story: [
                {
                    ...defaultStep,
                    displayOptions: {
                        backgroundColor: 'yellow',
                    },
                },
            ],
        });

        expect(props.context.changeLogoColor).toHaveBeenCalledWith('#000');
    });

    it('should set correct logo color when current page number change', () => {
        const props = {
            ...defaultProps,
            match: {
                params: {
                    page: 0,
                },
            },
            story: [
                { ...defaultStep, id: 1, displayOptions: { backgroundColor: 'white' } },
                { ...defaultStep, id: 2, displayOptions: { backgroundColor: 'yellow' } },
            ],
            context: {
                changeLogoColor: jest.fn(),
            },
        };

        const wrapper = shallow(<Story {...props} />);
        wrapper.setProps({
            ...props,
            match: {
                params: {
                    page: 1,
                },
            },
        });

        expect(props.context.changeLogoColor).toHaveBeenCalledWith('#000');
    });
});
