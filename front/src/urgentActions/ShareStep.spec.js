import React from 'react';
import { shallow } from 'enzyme';

import { ShareStep } from './ShareStep';
import SharingScreen from '../themes/Sharing/SharingScreen';

describe('<ShareStep />', () => {
    const defaultProps = {
        className: '',
        data: {
            title: 'Thank you!',
        },
    };

    it('should render a <SharingScreen />', () => {
        const props = {
            ...defaultProps,
            data: {
                title: 'Merci !',
                text: 'Envoyez une lettre ou partagez cette histoire.',
            },
            actions: () => <p className="customAction">Some actions...</p>,
        };

        const wrapper = shallow(<ShareStep {...props} />);
        const transitionScreen = wrapper.find(SharingScreen);
        expect(transitionScreen.length).toEqual(1);
    });

    it('should pass props to <TransitionScreen />', () => {
        const props = {
            ...defaultProps,
            data: {
                title: 'Merci !',
                text: 'Envoyez une lettre ou partagez cette histoire.',
            },
            actions: () => 'Some actions...',
        };

        const wrapper = shallow(<ShareStep {...props} />);
        const transitionScreen = wrapper.find(SharingScreen);

        expect(transitionScreen.prop('title')).toEqual('Merci !');
        expect(transitionScreen.prop('message')).toEqual(
            'Envoyez une lettre ou partagez cette histoire.',
        );
        expect(transitionScreen.prop('actions')()).toEqual('Some actions...');
    });
});
