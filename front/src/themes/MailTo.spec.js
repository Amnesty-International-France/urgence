import React from 'react';
import { shallow } from 'enzyme';
import { assocPath } from 'ramda';

import { MailTo } from './MailTo';

describe('MailTo', () => {
    const defaultProps = {
        recipient: {
            mail: 'mail@gmail.com',
        },
        subject: 'the subject',
        body: 'the body',
    };

    it('should render a mailto link with mail, subject and body', () => {
        const wrapper = shallow(<MailTo {...defaultProps} />);

        expect(wrapper.find('a').prop('href')).toBe(
            'mailto:mail%40gmail.com?subject=the%20subject&body=the%20body',
        );
    });

    it('should render a mailto link with cc too if copies_to is set', () => {
        const props = assocPath(
            ['recipient', 'copies_to'],
            'copy@gmail.com',
            defaultProps,
        );

        const wrapper = shallow(<MailTo {...props} />);

        expect(wrapper.find('a').prop('href')).toBe(
            'mailto:mail%40gmail.com?subject=the%20subject&body=the%20body&cc=copy%40gmail.com',
        );
    });

    it('should render a mailto link with bcc too if cci is set', () => {
        const props = assocPath(
            ['recipient', 'cci'],
            'invisiblecopy@gmail.com',
            defaultProps,
        );

        const wrapper = shallow(<MailTo {...props} />);

        expect(wrapper.find('a').prop('href')).toBe(
            'mailto:mail%40gmail.com?subject=the%20subject&body=the%20body&bcc=invisiblecopy%40gmail.com',
        );
    });

    it('should disabled link and Button if disabeld is true', () => {
        const props = {
            ...defaultProps,
            disabled: true,
        };

        const wrapper = shallow(<MailTo {...props} />);

        expect(wrapper.find('a').prop('disabled')).toBe(true);
        expect(wrapper.find('Button').prop('disabled')).toBe(true);
    });
});
