import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error TS(6142): Module '../../themes/RichText' was resolved to '/h... Remove this comment to see the full error message
import RichText from '../../themes/RichText';
// @ts-expect-error TS(6142): Module './MessageView' was resolved to '/home/guil... Remove this comment to see the full error message
import { MessageView } from './MessageView';
// @ts-expect-error TS(6142): Module './LetterView' was resolved to '/home/guill... Remove this comment to see the full error message
import LetterView from './LetterView';
// @ts-expect-error TS(6142): Module './Form' was resolved to '/home/guillaume/d... Remove this comment to see the full error message
import Form from './Form';

describe('MessageView', () => {
    const defaultStep = [{ value: 'one' }, { value: 'two' }, { value: 'three' }];
    const defaultProps = {
        text: 'text',
        button_view: 'button',
        objectIndication: 'object indication',
        objectExample: 'object example',
        messageTemplate: defaultStep,
        recipient: {
            mail: 'mail',
        },
        loading: false,
        match: { params: {} },
        history: { push: () => null },
    };

    it('should display a 404 message if there is no message template', () => {
        const test = (messageTemplate: any, shouldBeErrored: any) => {
            const props = { ...defaultProps, messageTemplate };
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            const wrapper = shallow(<MessageView {...props} />);

            const error = wrapper.find('.error');
            expect(error.length > 0).toBe(shouldBeErrored);
        };

        test(null, true);
        test(undefined, true);
        test([], true);
        test([defaultStep], false);
    });

    it('should display a <LetterView />', () => {
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = shallow(<MessageView {...defaultProps} />);

        const letter = wrapper.find(LetterView);
        expect(letter.length).toBe(1);
    });

    it('should display a <Form />', () => {
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = shallow(<MessageView {...defaultProps} />);

        const form = wrapper.find(Form);
        expect(form.length).toBe(1);
    });

    it('should display a <RichText />', () => {
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = shallow(<MessageView {...defaultProps} />);

        const text = wrapper.find(RichText);
        expect(text.length).toBe(1);
    });
});
