import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import Paper from '@material-ui/core/Paper';

import LongText from '../themes/LongText';
import RichText from '../themes/RichText';
import { ThankStep } from './ThankStep';
import Share from './share/Share';

describe('<ThankStep />', () => {
    const defaultProps = {
        className: '',
        data: {
            title: 'Thank you!',
            text: 'Envoyez une lettre ou partagez cette histoire.',
        },
    };

    it('should display two <Paper />', () => {
        const wrapper = shallow(<ThankStep {...defaultProps} />);

        const paper = wrapper.find(Paper);
        expect(paper.length).toBe(2);
    });

    it('should display a <LongText />', () => {
        const wrapper = shallow(<ThankStep {...defaultProps} />);

        const text = wrapper.find(LongText);
        expect(text.length).toBe(1);
    });

    it('should display a <RichText />', () => {
        const wrapper = shallow(<ThankStep {...defaultProps} />);

        const text = wrapper.find(RichText);
        expect(text.length).toBe(1);
    });

    it('should display a <ShareForm />', () => {
        const wrapper = shallow(<ThankStep {...defaultProps} />);

        const text = wrapper.find(Share);
        expect(text.length).toBe(1);
    });
});
