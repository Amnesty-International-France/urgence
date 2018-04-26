import React from 'react';
import { shallow } from 'enzyme';
import { PreviewLink } from './PreviewLink';
import Button from 'material-ui/Button';

describe('<PreviewLink />', () => {
    const defaultProps = {
        record: {
            id: '3b6e1a3e-2547-4d77-a310-1b39d15fa03a',
        }
    };

    it('should render as a link to front app urgent action page', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<PreviewLink {...props} />);

        const button = wrapper.find(Button);
        expect(button.prop('href')).toBe('http://localhost:3000/UA/3b6e1a3e-2547-4d77-a310-1b39d15fa03a');
    });

    it('should be disabled if there is no story currently configured', () => {
        const test = (story, shouldBeDisabled) => {
            const props = {
                ...defaultProps,
                record: {
                    ...defaultProps.record,
                    story,
                },
            };
            const wrapper = shallow(<PreviewLink {...props} />);

            const button = wrapper.find(Button);
            expect(button.prop('disabled')).toBe(shouldBeDisabled);
        };

        test(null, true);
        test(undefined, true);
        test([], true);
        test([{}], false);
    });

    it('should return null if no record is given', () => {
        const props = { ...defaultProps, record: null };
        const wrapper = shallow(<PreviewLink {...props} />);
        expect(wrapper.instance()).toBe(null);
    })
});
