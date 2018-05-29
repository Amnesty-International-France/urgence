import React from 'react';
import { shallow } from 'enzyme';

import { AddressStep } from './AddressStep';
import TextArea from '../themes/TextArea';

describe('<AddressStep />', () => {
    const defaultProps = {
        action: () => 'action',
        className: 'class',
        address: 'address value',
        setAddress: () => {},
    };

    it('should put action result inside .action div', () => {
        const wrapper = shallow(<AddressStep {...defaultProps} />);
        const action = wrapper.find('.action');
        expect(action.html()).toBe('<div class="action">action</div>');
    });

    it('should call action props with true if object is set', () => {
        const props = {
            ...defaultProps,
            action: jest.fn(),
        };

        shallow(<AddressStep {...props} />);
        expect(props.action).toHaveBeenCalledWith(false);
    });

    it('should call action props with true if object is not set', () => {
        const props = {
            ...defaultProps,
            action: jest.fn(),
            address: null,
        };

        shallow(<AddressStep {...props} />);
        expect(props.action).toHaveBeenCalledWith(true);
    });

    it('should render textarea with value = context.address and onChange = context.setAddress', () => {
        const props = {
            ...defaultProps,
            setAddress: jest.fn(),
        };

        const wrapper = shallow(<AddressStep {...props} />);
        const textarea = wrapper.find(TextArea);

        expect(textarea.prop('value')).toBe('address value');
        expect(textarea.prop('onChange')).toBe(wrapper.instance().setAddress);

        wrapper.instance().setAddress({ target: { value: 'new value' } });
        expect(props.setAddress).toBeCalledWith('new value');
    });
});
