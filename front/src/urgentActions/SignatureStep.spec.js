import React from 'react';
import { shallow } from 'enzyme';

import { SignatureStep } from './SignatureStep';

describe('<SignatureStep />', () => {
    const defaultProps = {
        messageTemplate: [],
        action: <p>action</p>,
        signature: 'signature value',
        setSignature: jest.fn(),
    };

    it('should display a textarea with value = props.object', () => {
        const wrapper = shallow(<SignatureStep {...defaultProps} />);
        const textarea = wrapper.find('textarea');
        expect(textarea.prop('value')).toBe('signature value');
    });

    it('should call setSignature with event value when triggering textarea onChange', () => {
        const wrapper = shallow(<SignatureStep {...defaultProps} />);
        const textarea = wrapper.find('textarea');

        textarea.simulate('change', { target: { value: 'new value' } });
        expect(defaultProps.setSignature).toHaveBeenCalledWith('new value');
    });

    it('should render action', () => {
        const wrapper = shallow(<SignatureStep {...defaultProps} />);
        const action = wrapper.find('.action');
        expect(action.text()).toBe('action');
    });
});
