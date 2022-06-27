import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';

import { black, white, yellow } from '../../themes/colors';
import Carousel from '../../themes/Carousel';
import { Story, getLogoColorForStoryStep } from './Story';

const defaultStep = {
    id: '1',
    content: '',
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
        const test = (story) => {
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

    describe('Navigate in Story', () => {
        it('should update logo color in context after changing story to story', () => {
            const props = {
                ...defaultProps,
                story: [
                    { ...defaultStep, id: 1 },
                    { ...defaultStep, id: 2 },
                    { ...defaultStep, id: 3 },
                ],
                context: {
                    changeLogoColor: jest.fn(),
                },
            };

            const wrapper = shallow(<Story {...props} />);
            const carousel = wrapper.find(Carousel);
            const afterChange = carousel.prop('afterChange');

            afterChange(1);

            expect(props.context.changeLogoColor).toHaveBeenCalledWith({
                logoColor: black,
                logoBackgroundColor: yellow,
            });
        });

        it('should update logo color in context after changing story to act', () => {
            const props = {
                ...defaultProps,
                story: [
                    { ...defaultStep, id: 1 },
                    { ...defaultStep, id: 2 },
                    { ...defaultStep, id: 3 },
                ],
                context: {
                    changeLogoColor: jest.fn(),
                },
            };

            const wrapper = shallow(<Story {...props} />);
            const carousel = wrapper.find(Carousel);
            const afterChange = carousel.prop('afterChange');

            afterChange(4);

            expect(props.context.changeLogoColor).toHaveBeenCalledWith({
                logoColor: white,
                logoBackgroundColor: black,
            });
        });
    });

    describe('getLogoColorForStoryStep', () => {
        it('should return black/yellow in "story"', () => {
            const step = 'story';

            const result = getLogoColorForStoryStep(step);
            expect(result.logoColor).toBe(black);
            expect(result.logoBackgroundColor).toBe(yellow);
        });

        it('should return white/black in "act"', () => {
            const step = 'act';

            const result = getLogoColorForStoryStep(step);
            expect(result.logoColor).toBe(white);
            expect(result.logoBackgroundColor).toBe(black);
        });
    });
});
