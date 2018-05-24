import React from 'react';
import { shallow } from 'enzyme';

import { ObjectStep } from './ObjectStep';

describe('<ObjectStep />', () => {
    const defaultProps = {
        objectIndication:
            'Indiquez par exemple que vous souhaitez parler de cette situation inacceptable.',
        action: jest.fn().mockReturnValue('action'),
        className: 'class',
        object: 'object value',
        setObject: jest.fn(),
    };

    describe('renderOnjectStep', () => {
        it('should display objectIndication as HTML', () => {
            const props = {
                ...defaultProps,
                objectIndication: '<p>hello world</p>',
            };

            const wrapper = shallow(<ObjectStep{...props} />);
            const richText = wrapper.find('RichText');
            expect(richText.prop('html')).toBe('<p>hello world</p>');
        });

        it('should put action result inside .action div', () => {
            const wrapper = shallow(<ObjectStep {...defaultProps} />);
            const action = wrapper.find('.action');
            expect(action.html()).toBe('<div class="action">action</div>');
        });

        it('should call action props with true if object is set', () => {
            shallow(<ObjectStep {...defaultProps} />);
            expect(defaultProps.action).toHaveBeenCalledWith(false);
        });

        it('should call action props with false if object is not set', () => {
            const props = {
                ...defaultProps,
                object: null,
            };
            shallow(<ObjectStep {...props} />);
            expect(defaultProps.action).toHaveBeenCalledWith(false);
        });

        it('should render Input with value = context.object and onChange = context.setObject', () => {
            const wrapper = shallow(<ObjectStep {...defaultProps} />);
            const input = wrapper.find('input');
            expect(input.prop('value')).toBe('object value');
            expect(input.prop('onChange')).toBe(wrapper.instance().setObject);

            wrapper.instance().setObject({ target: { value: 'new value' } });
            expect(defaultProps.setObject).toBeCalledWith('new value');
        });
    });
});
