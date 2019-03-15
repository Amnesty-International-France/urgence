import React from 'react';
import { shallow } from 'enzyme';
import { PreviewLetter } from './PreviewLetter';
import Button from '@material-ui/core/Button';


describe('<PreviewLetter />', () => {
    const defaultProps = {
        record: {
            id: '3b6e1a3e-2547-4d77-a310-1b39d15fa03a',
        },
    };

    it('should render as a link to front app urgent action letter page with pre-filled subject and emitter name', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<PreviewLetter {...props} />);

        const button = wrapper.find(Button);
        expect(button.prop('href')).toMatchSnapshot();
    });

    it('should be disabled if there is no message template currently configured', () => {
        const test = (message_template, shouldBeDisabled) => {
            const props = {
                ...defaultProps,
                record: {
                    ...defaultProps.record,
                    message_template,
                },
            };
            const wrapper = shallow(<PreviewLetter {...props} />);

            const button = wrapper.find(Button);
            expect(button.prop('disabled')).toBe(shouldBeDisabled);
        };

        test(null, true);
        test(undefined, true);
        test([], true);
        test([{}], false);
    });

    it('should open preview in a new tab', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<PreviewLetter {...props} />);

        const button = wrapper.find(Button);
        expect(button.prop('target')).toBe('_blank');
        expect(button.prop('rel')).toBe('noopener noreferrer');
    });

    it('should return null if no record is given', () => {
        const props = { ...defaultProps, record: null };
        const wrapper = shallow(<PreviewLetter {...props} />);
        expect(wrapper.instance()).toBe(null);
    });
});
