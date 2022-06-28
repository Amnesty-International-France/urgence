import React from 'react';
import { mount } from 'enzyme';

import Share from './Share';
import RichText from '../../themes/RichText';
import LongText from '../../themes/LongText';
import ShareForm from '../../themes/Sharing/ShareForm';
import LinkTelegram from '../../themes/Sharing/LinkTelegram';

describe('<Share />', () => {
    const defaultProps = {
        className: '',
        data: {
            title: 'Merci !',
            text: 'Envoyez le lien à vos potes.',
            share: {
                message: 'Some data...',
            },
            telegram: {
                message: 'Test',
                url: 'http://test.com',
            },
        },
    };

    it('should display a <LongText />', () => {
        const wrapper = mount(<Share {...defaultProps} />);

        const text = wrapper.find(LongText);
        expect(text.length).toBe(1);
    });

    it('should display a <RichText />', () => {
        const wrapper = mount(<Share {...defaultProps} />);

        const text = wrapper.find(RichText);
        expect(text.length).toBeGreaterThan(1);
    });

    it('should display a <ShareForm />', () => {
        const wrapper = mount(<Share {...defaultProps} />);

        const shareForm = wrapper.find(ShareForm);
        expect(shareForm.length).toBe(1);
    });

    it('should display a <LinkTelegram />', () => {
        const wrapper = mount(<Share {...defaultProps} />);

        const linkTelegram = wrapper.find(LinkTelegram);
        expect(linkTelegram.length).toBe(1);
    });

    it('should not display a <LinkTelegram /> if no link', () => {
        // @ts-expect-error TS(2739): Type '{}' is missing the following properties from... Remove this comment to see the full error message
        defaultProps.data.telegram = {};
        const wrapper = mount(<Share {...defaultProps} />);

        const linkTelegram = wrapper.find(LinkTelegram);
        expect(linkTelegram.length).toBe(0);
    });
});
