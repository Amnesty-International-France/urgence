import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { mount } from 'enzyme';

// @ts-expect-error TS(6142): Module './Share' was resolved to '/home/guillaume/... Remove this comment to see the full error message
import Share from './Share';
// @ts-expect-error TS(6142): Module '../../themes/RichText' was resolved to '/h... Remove this comment to see the full error message
import RichText from '../../themes/RichText';
// @ts-expect-error TS(6142): Module '../../themes/LongText' was resolved to '/h... Remove this comment to see the full error message
import LongText from '../../themes/LongText';
// @ts-expect-error TS(6142): Module '../../themes/Sharing/ShareForm' was resolv... Remove this comment to see the full error message
import ShareForm from '../../themes/Sharing/ShareForm';
// @ts-expect-error TS(6142): Module '../../themes/Sharing/LinkTelegram' was res... Remove this comment to see the full error message
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
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = mount(<Share {...defaultProps} />);

        const text = wrapper.find(LongText);
        expect(text.length).toBe(1);
    });

    it('should display a <RichText />', () => {
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = mount(<Share {...defaultProps} />);

        const text = wrapper.find(RichText);
        expect(text.length).toBeGreaterThan(1);
    });

    it('should display a <ShareForm />', () => {
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = mount(<Share {...defaultProps} />);

        const shareForm = wrapper.find(ShareForm);
        expect(shareForm.length).toBe(1);
    });

    it('should display a <LinkTelegram />', () => {
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = mount(<Share {...defaultProps} />);

        const linkTelegram = wrapper.find(LinkTelegram);
        expect(linkTelegram.length).toBe(1);
    });

    it('should not display a <LinkTelegram /> if no link', () => {
        // @ts-expect-error TS(2739): Type '{}' is missing the following properties from... Remove this comment to see the full error message
        defaultProps.data.telegram = {};
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = mount(<Share {...defaultProps} />);

        const linkTelegram = wrapper.find(LinkTelegram);
        expect(linkTelegram.length).toBe(0);
    });
});
