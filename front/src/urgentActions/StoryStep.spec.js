import React from 'react';
import { shallow } from 'enzyme';

import { StoryStep, getLogoColorForStep } from './StoryStep';
import ActButton from './ActButton';
import { white, black, pink, yellow, orange } from '../themes/colors';

describe('<StoryStep />', () => {
    const defaultProps = {
        className: 'story-step',
        displayOptions: {
            backgroundColor: 'white',
            color: 'white',
            mediumPosition: 'top',
        },
        medium: {
            src: '/foo.jpg',
            title: 'An inspirational picture',
        },
        content: 'Abdolfatah Soltani is a Human Rights Iranian lawyer.',
    };

    it('should display slide with correct backgroundColor (and then color)', () => {
        const wrapper = shallow(<StoryStep {...defaultProps} />);

        const storyStep = wrapper.find('.story-step');
        expect(storyStep.prop('style').backgroundColor).toBe(white);
        expect(storyStep.prop('style').color).toBe(black);
    });

    it('should display a picture with correct URL and title if any is provided', () => {
        const props = {
            ...defaultProps,
            medium: {
                src: '/foo.jpg',
                title: 'An inspirational picture',
            },
        };

        const wrapper = shallow(<StoryStep {...props} />);

        const img = wrapper.find('glamorous(Image)');
        expect(img.prop('src')).toBe('/foo.jpg');
        expect(img.prop('title')).toBe('An inspirational picture');
    });

    it('should still render properly if no picture is provided', () => {
        const props = {
            ...defaultProps,
            medium: null,
        };

        const wrapper = shallow(<StoryStep {...props} />);

        const img = wrapper.find('glamorous(Image)');
        expect(img.length).toBe(0);
    });

    it('should display picture on top if theme position is "top"', () => {
        const props = {
            ...defaultProps,
            displayOptions: {
                ...defaultProps.displayOptions,
                mediumPosition: 'top',
            },
        };

        const wrapper = shallow(<StoryStep {...props} />);
        const image = wrapper
            .find('.step')
            .childAt(0)
            .childAt(0);
        expect(image.is('glamorous(Image)')).toBeTruthy();
    });

    it('should display picture at bottom if theme position is "bottom"', () => {
        const props = {
            ...defaultProps,
            displayOptions: {
                ...defaultProps.displayOptions,
                mediumPosition: 'bottom',
            },
        };

        const wrapper = shallow(<StoryStep {...props} />);
        const image = wrapper
            .find('.step')
            .childAt(1)
            .childAt(0);
        expect(image.is('glamorous(Image)')).toBeTruthy();
    });

    it('should display step content as HTML', () => {
        const props = {
            ...defaultProps,
            content: '<p>Hello world!</p>',
        };

        const wrapper = shallow(<StoryStep {...props} />);
        const richText = wrapper.find('RichText');
        expect(richText.prop('html')).toBe('<p>Hello world!</p>');
    });

    it('should display ActButton if hasActButton is true', () => {
        const props = {
            ...defaultProps,
            hasActButton: true,
        };

        const wrapper = shallow(<StoryStep {...props} />);
        const actButton = wrapper.find(ActButton);
        expect(actButton).toHaveLength(1);
    });

    describe('getLogoColorForStep', () => {
        it('should return white if there is a top medium', () => {
            const step = {
                medium: {},
                displayOptions: {
                    mediumPosition: 'top',
                },
            };

            expect(getLogoColorForStep(step)).toBe(white);
        });

        it('should return black for yellow and white, white otherwise', () => {
            const test = (backgroundColor, expectedLogoColor) => {
                const step = {
                    medium: {},
                    displayOptions: {
                        backgroundColor,
                    },
                };

                expect(getLogoColorForStep(step)).toBe(expectedLogoColor);
            };

            test('yellow', black);
            test('pink', white);
            test('orange', white);
            test('white', black);
            test('black', white);
        });

        it('should render correctly even if no displayOptions is passed', () => {
            const step = {
                medium: {},
                displayOptions: null,
            };

            getLogoColorForStep(step);
        });
    });
});
