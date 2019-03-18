import React from 'react';
import { shallow } from 'enzyme';

import { MailPdfButton } from './MailPdfButton';
import ToUrgentActionPageLink from './ToUrgentActionPageLink';

describe('MailPdfButton', () => {
    const defaultProps = {
        object: 'object',
        civility: 'civility',
        surname: 'surname',
        name: 'name',
        addressMain: 'addressMain',
        addressMore: 'addressMore',
        postalCode: 'postalCode',
        city: 'city',
        country: 'country',
        email: 'email',
        match: { params: { id: 'id' } },
        buttonText: "J'envoie",
    };

    it('should render ToUrgentActionPageLink', () => {
        const wrapper = shallow(<MailPdfButton {...defaultProps} />);
        const link = wrapper.find(ToUrgentActionPageLink);

        expect(link.prop('pageName')).toBe('thanks-letter');
        expect(link.prop('label')).toBe("J'envoie");
        expect(link.prop('onClick')).toBe(wrapper.instance().sendMail);
    });

    it('sendMail should call fetch', () => {
        global.fetch = jest.fn();
        const sendMail = shallow(<MailPdfButton {...defaultProps} />).instance().sendMail;
        sendMail();
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/urgent-actions/id/send', {
            body:
                '{"subject":"object","civility":"civility","surname":"surname","name":"name","addressMain":"addressMain","addressMore":"addressMore","postalCode":"postalCode","city":"city","country":"country","email":"email"}',
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
        });
    });
});
