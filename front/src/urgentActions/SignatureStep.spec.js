import React from 'react';
import { shallow } from 'enzyme';

import { SignatureStep } from './SignatureStep';

describe('<SignatureStep />', () => {
    const defaultProps = {
        signature: 'signature value',
        changeSignature: jest.fn(),
        messageTemplate: [],
        action: <p className="action">action</p>,
    };

    it('should display a textarea with value = props.object', () => {
        const wrapper = shallow(<SignatureStep {...defaultProps} />);
        const textarea = wrapper.find('textarea');
        expect(textarea.prop('value')).toBe('signature value');
    });

    it('should call changeSignature with event value when triggering textarea onChange', () => {
        const wrapper = shallow(<SignatureStep {...defaultProps} />);
        const textarea = wrapper.find('textarea');

        textarea.simulate('change', { target: { value: 'new value' } });
        expect(defaultProps.changeSignature).toHaveBeenCalledWith({
            target: { value: 'new value' },
        });
    });

    it('should render action', () => {
        const wrapper = shallow(<SignatureStep {...defaultProps} />);
        const action = wrapper.find('.action');
        expect(action.text()).toBe('action');
    });
});
