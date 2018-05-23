import React from 'react';
import { shallow } from 'enzyme';

import { Thanks } from './Thanks';

describe('<Thanks />', () => {
    const defaultProps = {
        className: '',
        title: 'Thank you!',
    };

    it('should display given title, text and actions', () => {
        const props = {
            ...defaultProps,
            title: 'Merci !',
            text: 'Envoyez une lettre ou partagez cette histoire.',
            actions: () => <p className="customAction">Some actions...</p>,
        };

        const wrapper = shallow(<Thanks {...props} />);
        expect(wrapper.find('h1').text()).toBe('Merci !');
        expect(wrapper.find('.text').text()).toBe('Envoyez une lettre ou partagez cette histoire.');
        expect(wrapper.find('.customAction').text()).toBe('Some actions...');
    });

    it('should not display text if none is provided', () => {
        const props = {
            ...defaultProps,
            text: null,
        };

        const wrapper = shallow(<Thanks {...props} />);
        expect(wrapper.find('.text').length).toBe(0);
    });
});
