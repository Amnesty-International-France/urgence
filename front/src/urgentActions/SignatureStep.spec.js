import React from 'react';
import { shallow } from 'enzyme';

import { SignatureStep } from './SignatureStep';
import Input from '../themes/Input';

describe('<SignatureStep />', () => {
    const defaultProps = {
        messageTemplate: [],
        action: <p>action</p>,
        signature: 'signature value',
        setSignature: jest.fn(),
    };

    it('should display an input whose value is `object` prop', () => {
        const wrapper = shallow(<SignatureStep {...defaultProps} />);
        const input = wrapper.find(Input);
        expect(input.prop('value')).toBe('signature value');
    });

    it('should call setSignature with event value when triggering input onChange', () => {
        const wrapper = shallow(<SignatureStep {...defaultProps} />);
        const input = wrapper.find(Input);

        input.simulate('change', { target: { value: 'new value' } });
        expect(defaultProps.setSignature).toHaveBeenCalledWith('new value');
    });

    it('should render action', () => {
        const wrapper = shallow(<SignatureStep {...defaultProps} />);
        const action = wrapper.find('.action');
        expect(action.text()).toBe('action');
    });
});
