import React from 'react';
import { shallow } from 'enzyme';

import { Thanks } from './Thanks';
import TransitionScreen from '../themes/TransitionScreen';

describe('<Thanks />', () => {
    const defaultProps = {
        className: '',
        data: {
            title: 'Thank you!',
        },
    };

    it('should render a <TransitionScreen />', () => {
        const props = {
            ...defaultProps,
            data: {
                title: 'Merci !',
                text: 'Envoyez une lettre ou partagez cette histoire.',
            },
            actions: () => <p className="customAction">Some actions...</p>,
        };

        const wrapper = shallow(<Thanks {...props} />);
        const transitionScreen = wrapper.find(TransitionScreen);
        expect(transitionScreen.length).toEqual(1);
    });

    it('should pass props to <TransitionScreen />', () => {
        const props = {
            ...defaultProps,
            data: {
                title: 'Merci !',
                text: 'Envoyez une lettre ou partagez cette histoire.',
            },
            actions: () => <p className="customAction">Some actions...</p>,
        };

        const wrapper = shallow(<Thanks {...props} />);
        const transitionScreen = wrapper.find(TransitionScreen);

        expect(transitionScreen.prop('title')).toEqual('Merci !');
        expect(transitionScreen.prop('message')).toEqual(
            'Envoyez une lettre ou partagez cette histoire.',
        );
        expect(transitionScreen.prop('actions')()).toEqual(
            `<p className="customAction">Some actions...</p>`,
        );
    });
});
