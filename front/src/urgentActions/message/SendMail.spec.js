import React from 'react';
import { shallow } from 'enzyme';

import SendMail from './SendMail';

describe('sendMail', () => {
    const defaultProps = {
        messageTemplate: [{ value: 'hello' }, { value: 'world' }],
        signature: 'signature',
        recipient: { mail: 'mail' },
        object: 'object',
    };

    it('should render MailTo with body computed from messageTemplate and signature', () => {
        const wrapper = shallow(<SendMail {...defaultProps} />);

        expect(wrapper.find('MailTo').prop('body')).toBe(
            'hello\n\nworld\n\nsignature',
        );
    });

    it('should render MailTo with recipient props', () => {
        const wrapper = shallow(<SendMail {...defaultProps} />);

        expect(wrapper.find('MailTo').prop('recipient')).toBe(
            defaultProps.recipient,
        );
    });

    it('should render MailTo with object props', () => {
        const wrapper = shallow(<SendMail {...defaultProps} />);

        expect(wrapper.find('MailTo').prop('subject')).toBe('object');
    });
});
