import React from 'react';
import { shallow } from 'enzyme';

import { Story } from './Story';

const defaultStep = {
    id: '1',
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
        match: { params: {} },
        history: { push: () => null },
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
                { ...defaultStep, id: '1', content: 'Hello' },
                { ...defaultStep, id: '2', content: 'World' },
            ],
        };

        const wrapper = shallow(<Story {...props} />);
        const storySteps = wrapper.find('glamorous(StoryStep)');
        expect(storySteps.map(s => s.prop('content'))).toEqual(['Hello', 'World']);
    });

    it('past last property to last item in story', () => {
        const props = {
            ...defaultProps,
            story: [
                { ...defaultStep, id: 1, content: 'Hello' },
                { ...defaultStep, id: 2, content: 'World' },
            ],
        };

        const wrapper = shallow(<Story {...props} />);
        const storySteps = wrapper.find('glamorous(StoryStep)');

        expect(storySteps.at(0).prop('hasActButton')).toBe(false);
        expect(storySteps.at(1).prop('hasActButton')).toBe(true);
    });

    it('should display a slide counter for each slide', () => {
        const props = {
            ...defaultProps,
            story: [
                { ...defaultStep, id: 1, content: 'Foo' },
                { ...defaultStep, id: 2, content: 'Bar' },
                { ...defaultStep, id: 3, content: 'Quz' },
            ],
        };

        const wrapper = shallow(<Story {...props} />);
        const counters = wrapper.find('.counter');
        expect(counters.map(c => c.text())).toEqual(['1/3', '2/3', '3/3']);
    });
});
