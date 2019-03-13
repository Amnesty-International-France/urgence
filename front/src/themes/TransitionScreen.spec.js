import React from 'react';
import { shallow } from 'enzyme';

import { TransitionScreen } from './TransitionScreen';
import RichText from './RichText';
import LongText from './LongText';

describe('<TransitionScreen />', () => {
    const defaultProps = {
        className: 'myClassName',
        title: 'Merci !',
        message: 'Envoyez une lettre ou partagez cette histoire.',
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
});
