import React from 'react';
import { mount } from 'enzyme';

import Share from './Share';
import RichText from '../../themes/RichText';
import LongText from '../../themes/LongText';
import ShareForm from '../../themes/Sharing/ShareForm';

describe('<Share />', () => {
    const defaultProps = {
        className: '',
        data: {
            title: 'Merci !',
            text: 'Envoyez le lien à vos potes.',
            share: {
                message: 'Some data...',
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
        expect(text.length).toBe(1);
    });

    it('should display a <ShareForm />', () => {
        const wrapper = mount(<Share {...defaultProps} />);

        const shareForm = wrapper.find(ShareForm);
        expect(shareForm.length).toBe(1);
    });
});
