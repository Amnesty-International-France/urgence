import React from 'react';
import { shallow } from 'enzyme';

import { StoryStep } from './StoryStep';
import ActButton from './ActButton';
import { colors } from '../themes/colors';

describe('<StoryStep />', () => {
    const defaultProps = {
        displayOptions: {
            backgroundColor: 'red',
            color: 'white',
            mediumPosition: 'top',
        },
        medium: {
            src: '/foo.jpg',
            title: 'An inspirational picture',
        },
        content: 'Abdolfatah Soltani is a Human Rights Iranian lawyer.',
    };

    it('should displayCarouselSlide with backgroundColor and color props', () => {
        const wrapper = shallow(<StoryStep {...defaultProps} />);

        const carouselSlide = wrapper.find('glamorous(CarouselSlide)');
        expect(carouselSlide.prop('backgroundColor')).toBe(colors.red);
        expect(carouselSlide.prop('color')).toBe(colors.white);
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
        const image = wrapper.childAt(0);
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
        const image = wrapper.childAt(1);

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
});
