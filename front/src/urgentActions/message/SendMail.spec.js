import React from 'react';
import { shallow, mount } from 'enzyme';

import { SendMail } from './SendMail';

describe('sendMail', () => {
    const defaultProps = {
        messageTemplate: [{ value: 'hello' }, { value: 'world' }],
        signature: 'signature',
        recipient: { mail: 'mail' },
        object: 'object',
        history: {
            push: jest.fn(),
        },
        match: {
            params: { id: 'id' },
        },
    };

    it('should render MailTo with body computed from messageTemplate and signature', () => {
        const wrapper = shallow(<SendMail {...defaultProps} />);

        expect(wrapper.find('MailTo').prop('body')).toBe('hello\n\nworld\n\nsignature');
    });

    it('should render MailTo with recipient props', () => {
        const wrapper = shallow(<SendMail {...defaultProps} />);

        expect(wrapper.find('MailTo').prop('recipient')).toBe(defaultProps.recipient);
    });

    it('should render MailTo with object props', () => {
        const wrapper = shallow(<SendMail {...defaultProps} />);

        expect(wrapper.find('MailTo').prop('subject')).toBe('object');
    });

    it('should call history.push with thanks url when clicked', () => {
        const wrapper = mount(<SendMail {...defaultProps} />);
        wrapper.find('Button').simulate('click');
        expect(defaultProps.history.push).toHaveBeenCalledWith('/ua/id/thanks');
    });
});
