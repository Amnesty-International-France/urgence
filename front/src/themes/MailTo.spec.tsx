import React from 'react';
import { shallow } from 'enzyme';
import { assocPath } from 'ramda';

import { MailTo, buildMailDest } from './MailTo';

describe('MailTo', () => {
    const defaultProps = {
        recipient: {
            mail: 'mail@gmail.com',
        },
        subject: 'the subject',
        body: 'the body',
        match: {
            params: { slug: 'im-a-slug' },
        },
    };

    it('should render a mailto link ', () => {
        const wrapper = shallow(<MailTo {...defaultProps} />);

        expect(wrapper.find('a').length).toBe(1);
    });

    describe('buildMailDest', () => {
        it('should return a mailto link with mail, subject and body', () => {
            expect(
                buildMailDest(defaultProps.recipient, defaultProps.subject, defaultProps.body),
            ).toBe('mailto:mail%40gmail.com?subject=the%20subject&body=the%20body');
        });

        it('should return a mailto link with cc too if copies_to is set', () => {
            const props = assocPath(['recipient', 'copies_to'], 'copy@gmail.com', defaultProps);

            expect(buildMailDest(props.recipient, props.subject, props.body)).toBe(
                'mailto:mail%40gmail.com?subject=the%20subject&body=the%20body&cc=copy%40gmail.com',
            );
        });

        it('should return a mailto link with bcc too if cci is set', () => {
            const props = assocPath(['recipient', 'cci'], 'invisiblecopy@gmail.com', defaultProps);

            expect(buildMailDest(props.recipient, props.subject, props.body)).toBe(
                'mailto:mail%40gmail.com?subject=the%20subject&body=the%20body&bcc=invisiblecopy%40gmail.com',
            );
        });

        it('should omit the subject param when the subject is empty (Outlook fix)', () => {
            expect(buildMailDest(defaultProps.recipient, '', 'Monsieur le Président,')).toBe(
                'mailto:mail%40gmail.com?body=Monsieur%20le%20Pr%C3%A9sident%2C',
            );
        });

        it('should encode body line breaks as CRLF for Outlook', () => {
            expect(buildMailDest(defaultProps.recipient, 'the subject', 'line1\nline2')).toBe(
                'mailto:mail%40gmail.com?subject=the%20subject&body=line1%0D%0Aline2',
            );
        });
    });

    it('should add disabled class to link if disabled is true', () => {
        const props = {
            ...defaultProps,
            disabled: true,
        };

        const wrapper = shallow(<MailTo {...props} />);

        expect(wrapper.find('a').prop('className')).toBe('disabled');
    });
});
