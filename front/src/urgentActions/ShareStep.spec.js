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
                text: 'Envoyez le lien à vos potes.',
            },
            share: { message: 'Some data...' },
            actions: () => <p className="customAction">Some actions...</p>,
        };

        const wrapper = shallow(<ShareStep {...props} />);
        const sharingScreen = wrapper.find(SharingScreen);
        expect(sharingScreen.length).toEqual(1);
    });

    it('should pass props to <SharingScreen />', () => {
        const props = {
            ...defaultProps,
            data: {
                title: 'Merci !',
                text: 'Envoyez le lien à vos potes.',
            },
            share: { message: 'Some data...' },
        };

        const wrapper = shallow(<ShareStep {...props} />);
        const sharingScreen = wrapper.find(SharingScreen);

        expect(sharingScreen.prop('title')).toEqual('Merci !');
        expect(sharingScreen.prop('message')).toEqual('Envoyez le lien à vos potes.');
        expect(sharingScreen.prop('share')()).toEqual({ message: 'Some data...' });
    });
});
