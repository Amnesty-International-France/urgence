import React from 'react';
import { shallow } from 'enzyme';

import { StoryStep, getLogoColorForStep } from './StoryStep';
import { white, black } from '../../themes/colors';

describe('<StoryStep />', () => {
    const defaultProps = {
        className: 'story-step',
        content: 'Abdolfatah Soltani is a Human Rights Iranian lawyer.',
    };

    it('should display step content as HTML', () => {
        const props = {
            ...defaultProps,
            content: '<p>Hello world!</p>',
        };

        const wrapper = shallow(<StoryStep {...props} />);
        const richText = wrapper.find('RichText');
        expect(richText.prop('html')).toBe('<p>Hello world!</p>');
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
