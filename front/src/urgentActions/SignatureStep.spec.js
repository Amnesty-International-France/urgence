import React from 'react';
import { shallow } from 'enzyme';

import { renderSignatureStep } from './SignatureStep';

describe('<SignatureStep />', () => {
    const defaultProps = {
        messageTemplate: [],
        action: <p>action</p>,
    };
    const defaultContext = {
        signature: 'signature value',
        changeSignature: jest.fn(),
    };

    it('should display a textarea with value = props.object', () => {
        const wrapper = shallow(renderSignatureStep(defaultProps)(defaultContext));
        const textarea = wrapper.find('textarea');
        expect(textarea.prop('value')).toBe('signature value');
    });

    it('should call changeSignature with event value when triggering textarea onChange', () => {
        const wrapper = shallow(renderSignatureStep(defaultProps)(defaultContext));
        const textarea = wrapper.find('textarea');

        textarea.simulate('change', { target: { value: 'new value' } });
        expect(defaultContext.changeSignature).toHaveBeenCalledWith({
            target: { value: 'new value' },
        });
    });

    it('should render action', () => {
        const wrapper = shallow(renderSignatureStep(defaultProps)(defaultContext));
        const action = wrapper.find('.action');
        expect(action.text()).toBe('action');
    });
});
