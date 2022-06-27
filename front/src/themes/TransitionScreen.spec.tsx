import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { mount, shallow } from 'enzyme';

import { TransitionScreen } from './TransitionScreen';
// @ts-expect-error TS(6142): Module './RichText' was resolved to '/home/guillau... Remove this comment to see the full error message
import RichText from './RichText';
// @ts-expect-error TS(6142): Module './LongText' was resolved to '/home/guillau... Remove this comment to see the full error message
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
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            actions: () => <p className="customAction">Some actions...</p>,
        };

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = shallow(<TransitionScreen {...props} />);
        expect(wrapper.find(RichText).length).toBe(0);
    });

    it('should display progress chart if props provided', () => {
        const props = {
            ...defaultProps,
        };

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = mount(<TransitionScreen {...props} />);
        expect(wrapper.find(CircularProgressbarWithChildren).length).toBe(0);
    });
});
