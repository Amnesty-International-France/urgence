import React from 'react';
import { shallow } from 'enzyme';

import { renderSendMail, SendMail } from './SendMail';

describe('renderSendMail', () => {
    const defaultProps = {
        messageTemplate: [{ value: 'hello' }, { value: 'world' }],
        recipient: { mail: 'mail' },
        afterMail: jest.fn(),
    };
    const defaultContext = {
        civility: 'civility',
        firstname: 'firstname',
        lastname: 'lastname',
        object: 'object',
    };

    it('should render MailTo with body computed from messageTemplate and fullname', () => {
        const wrapper = shallow(renderSendMail(defaultProps)(defaultContext));

        expect(wrapper.find('MailTo').prop('body')).toBe('hello\n\nworld\n\nfirstname lastname');
    });

    it('should render MailTo with recipient props', () => {
        const wrapper = shallow(renderSendMail(defaultProps)(defaultContext));

        expect(wrapper.find('MailTo').prop('recipient')).toBe(defaultProps.recipient);
        expect(wrapper.find('MailTo').prop('afterMail')).toBe(defaultProps.afterMail);
    });

    it('should render MailTo with object props', () => {
        const wrapper = shallow(renderSendMail(defaultProps)(defaultContext));

        expect(wrapper.find('MailTo').prop('subject')).toBe('object');
    });

    it('afterMail should call history.push with thanks url when clicked', () => {
        const props = {
            ...defaultProps,
            match: { params: { slug: 'slug-slug-slug' } },
            history: {
                push: jest.fn(),
            },
        };
        const wrapper = shallow(<SendMail {...props} />, defaultContext);
        wrapper.instance().afterMail();
        expect(props.history.push).toHaveBeenCalledWith('/ua/slug-slug-slug/thanks');
    });
});
