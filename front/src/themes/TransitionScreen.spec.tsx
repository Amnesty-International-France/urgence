import React from 'react';
import { mount, shallow } from 'enzyme';

import { TransitionScreen } from './TransitionScreen';
import RichText from './RichText';
import LongText from './LongText';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

describe('<TransitionScreen />', () => {
    const defaultProps = {
        className: 'myClassName',
        title: 'Merci !',
        message: 'Envoyez une lettre ou partagez cette histoire.',
        progress: {
            display: true,
            objective: 100,
            message: '<p>Vous avez déjà envoyé <strong>10</strong></p>',
        },
        responseCount: 10,
        match: { params: { slug: 'my-slug' } },
        interpelationMode: 'email',
    };

    it('should display given title, text and actions', () => {
        const props = {
            ...defaultProps,
            actions: () => <p className="customAction">Some actions...</p>,
        };

        const wrapper = shallow(<TransitionScreen {...props} />);
        expect(wrapper.find(LongText).prop('text')).toEqual('Merci !');
        expect(wrapper.find(RichText).prop('html')).toEqual(
            'Envoyez une lettre ou partagez cette histoire.',
        );
        expect(wrapper.find('.customAction').text()).toEqual('Some actions...');
    });

    it('should not display message if none is provided', () => {
        const props = {
            ...defaultProps,
            message: null,
        };

        const wrapper = shallow(<TransitionScreen {...props} />);
        expect(wrapper.find(RichText).length).toBe(0);
    });

    it('should display progress chart if props provided', () => {
        const props = {
            ...defaultProps,
        };

        const wrapper = mount(<TransitionScreen {...props} />);
        expect(wrapper.find(CircularProgressbarWithChildren).length).toBe(1);
    });

    it('should not display progress chart if display false', () => {
        const props = {
            ...defaultProps,
            progress: {
                display: false,
            },
        };

        const wrapper = mount(<TransitionScreen {...props} />);
        expect(wrapper.find(CircularProgressbarWithChildren).length).toBe(0);
    });
});
