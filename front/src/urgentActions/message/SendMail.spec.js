import React from 'react';
import { shallow } from 'enzyme';

import { SendMail } from './SendMail';

describe('SendMail', () => {
    const defaultProps = {
        auId: '1',
        messageTemplate: [{ value: 'hello' }, { value: 'world' }],
        recipient: { mail: 'mail' },
    };
    const defaultContext = {
        civility: 'civility',
        firstname: 'firstname',
        lastname: 'lastname',
        object: 'object',
    };

    it('should render MailTo with body computed from messageTemplate and fullname', () => {
        const wrapper = shallow(<SendMail {...defaultProps} {...defaultContext} />);

        expect(wrapper.find('MailTo').prop('body')).toBe('hello\n\nworld\n\nfirstname lastname');
    });

    it('should render MailTo with recipient props', () => {
        const wrapper = shallow(<SendMail {...defaultProps} {...defaultContext} />);

        expect(wrapper.find('MailTo').prop('recipient')).toBe(defaultProps.recipient);
        expect(wrapper.find('MailTo').prop('afterMail')).toBeInstanceOf(Function);
    });

    it('should render MailTo with object props', () => {
        const wrapper = shallow(<SendMail {...defaultProps} {...defaultContext} />);

        expect(wrapper.find('MailTo').prop('subject')).toBe('object');
    });

    it('afterMail should call afterMail when clicked', () => {
        const props = {
            ...defaultProps,
            afterMail: jest.fn(),
        };
        const wrapper = shallow(<SendMail {...defaultProps} {...defaultContext} />);

        wrapper.find('MailTo').prop('afterMail')();
        expect(props.afterMail).toHaveBeenCalled();
    });
});
