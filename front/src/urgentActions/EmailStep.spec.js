import React from 'react';
import { shallow } from 'enzyme';

import { EmailStep } from './EmailStep';

describe('<EmailStep />', () => {
    const defaultProps = {
        action: () => 'action',
        className: 'class',
        email: 'email value',
        setEmail: () => {},
    };

    it('should put action result inside .action div', () => {
        const wrapper = shallow(<EmailStep {...defaultProps} />);
        const action = wrapper.find('.action');
        expect(action.html()).toBe('<div class="action">action</div>');
    });

    it('should call action props with true if email is set', () => {
        const props = {
            ...defaultProps,
            action: jest.fn(),
        };

        shallow(<EmailStep {...props} />);
        expect(props.action).toHaveBeenCalledWith(false);
    });

    it('should call action props with true if email is not set', () => {
        const props = {
            ...defaultProps,
            action: jest.fn(),
            email: null,
        };

        shallow(<EmailStep {...props} />);
        expect(props.action).toHaveBeenCalledWith(true);
    });

    it('should render input with value = context.address and onChange = context.setEmail', () => {
        const props = {
            ...defaultProps,
            setEmail: jest.fn(),
        };

        const wrapper = shallow(<EmailStep {...props} />);
        const input = wrapper.find('input');

        expect(input.prop('value')).toBe('email value');
        expect(input.prop('onChange')).toBe(wrapper.instance().setEmail);

        wrapper.instance().setEmail({ target: { value: 'new value' } });
        expect(props.setEmail).toBeCalledWith('new value');
    });
});
