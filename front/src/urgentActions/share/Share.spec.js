import React from 'react';
import { shallow } from 'enzyme';

import Share from './Share';
import SharingScreen from './SharingScreen';

describe('<Share />', () => {
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

        const wrapper = shallow(<Share {...props} />);
        const sharingScreen = wrapper.find(SharingScreen);
        expect(sharingScreen.length).toEqual(1);
    });

    it('should pass props to <SharingScreen />', () => {
        const props = {
            ...defaultProps,
            data: {
                title: 'Merci !',
                text: 'Envoyez le lien à vos potes.',
                share: { message: 'Some data...' },
            },
        };

        const wrapper = shallow(<Share {...props} />);
        const sharingScreen = wrapper.find(SharingScreen);

        expect(sharingScreen.prop('title')).toEqual('Merci !');
        expect(sharingScreen.prop('message')).toEqual('Envoyez le lien à vos potes.');
        expect(sharingScreen.prop('share')).toEqual({ message: 'Some data...' });
    });
});
