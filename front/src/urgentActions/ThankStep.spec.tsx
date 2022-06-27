import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import Paper from '@material-ui/core/Paper';

// @ts-expect-error TS(6142): Module '../themes/LongText' was resolved to '/home... Remove this comment to see the full error message
import LongText from '../themes/LongText';
// @ts-expect-error TS(6142): Module '../themes/RichText' was resolved to '/home... Remove this comment to see the full error message
import RichText from '../themes/RichText';
// @ts-expect-error TS(6142): Module './ThankStep' was resolved to '/home/guilla... Remove this comment to see the full error message
import { ThankStep } from './ThankStep';
// @ts-expect-error TS(6142): Module './share/Share' was resolved to '/home/guil... Remove this comment to see the full error message
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
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = shallow(<ThankStep {...defaultProps} />);

        const paper = wrapper.find(Paper);
        expect(paper.length).toBe(2);
    });

    it('should display a <LongText />', () => {
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = shallow(<ThankStep {...defaultProps} />);

        const text = wrapper.find(LongText);
        expect(text.length).toBe(1);
    });

    it('should display a <RichText />', () => {
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = shallow(<ThankStep {...defaultProps} />);

        const text = wrapper.find(RichText);
        expect(text.length).toBe(1);
    });

    it('should display a <ShareForm />', () => {
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = shallow(<ThankStep {...defaultProps} />);

        const text = wrapper.find(Share);
        expect(text.length).toBe(1);
    });
});
