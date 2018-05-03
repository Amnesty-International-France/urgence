import React from 'react';
import { shallow } from 'enzyme';

import { MailTo } from './MailTo';

describe('MailTo', () => {
    const defaultProps = {
        mail: 'mail@gmail.com',
        subject: 'the subject',
        body: 'the body',
    };

    it('should render a mailto link', () => {
        const wrapper = shallow(<MailTo {...defaultProps} />);

        expect(wrapper.find('a').prop('href')).toBe(
            'mailto:mail@gmail.com?subject=the%20subject&body=the%20body',
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
