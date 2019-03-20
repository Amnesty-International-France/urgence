import React from 'react';
import { shallow, mount } from 'enzyme';

import { renderSendMail, SendMail } from './SendMail';

describe('renderSendMail', () => {
    const defaultProps = {
        messageTemplate: [{ value: 'hello' }, { value: 'world' }],
        recipient: { mail: 'mail' },
        afterMail: jest.fn(),
    };
    const defaultContext = {
        civility: 'civility',
        surname: 'surname',
        name: 'name',
        object: 'object',
    };

    it('should render MailTo with body computed from messageTemplate and name', () => {
        const wrapper = shallow(renderSendMail(defaultProps)(defaultContext));

        expect(wrapper.find('MailTo').prop('body')).toBe('hello\n\nworld\n\nsurname name');
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
            match: { params: { id: 'id' } },
            history: {
                push: jest.fn(),
            },
        };
        const wrapper = shallow(<SendMail {...props} />, defaultContext);
        wrapper.instance().afterMail();
        expect(props.history.push).toHaveBeenCalledWith('/ua/id/thanks');
    });
});
