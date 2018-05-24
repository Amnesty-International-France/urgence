import React from 'react';
import { shallow } from 'enzyme';

import { ObjectStep } from './ObjectStep';

describe('<ObjectStep />', () => {
    const defaultProps = {
        objectIndication:
            'Indiquez par exemple que vous souhaitez parler de cette situation inacceptable.',
        action: () => 'action',
        className: 'class',
        object: 'object value',
        setObject: () => {},
    };

    describe('renderOnjectStep', () => {
        it('should display objectIndication as HTML', () => {
            const props = {
                ...defaultProps,
                objectIndication: '<p>hello world</p>',
            };

            const wrapper = shallow(<ObjectStep {...props} />);
            const richText = wrapper.find('RichText');
            expect(richText.prop('html')).toBe('<p>hello world</p>');
        });

        it('should put action result inside .action div', () => {
            const wrapper = shallow(<ObjectStep {...defaultProps} />);
            const action = wrapper.find('.action');
            expect(action.html()).toBe('<div class="action">action</div>');
        });

        it('should call action props with true if object is set', () => {
            const props = {
                ...defaultProps,
                action: jest.fn(),
            };

            shallow(<ObjectStep {...props} />);
            expect(props.action).toHaveBeenCalledWith(false);
        });

        it('should call action props with true if object is not set', () => {
            const props = {
                ...defaultProps,
                action: jest.fn(),
                object: null,
            };

            shallow(<ObjectStep {...props} />);
            expect(props.action).toHaveBeenCalledWith(true);
        });

        it('should render Input with value = context.object and onChange = context.setObject', () => {
            const props = {
                ...defaultProps,
                setObject: jest.fn(),
            };

            const wrapper = shallow(<ObjectStep {...props} />);
            const input = wrapper.find('input');

            expect(input.prop('value')).toBe('object value');
            expect(input.prop('onChange')).toBe(wrapper.instance().setObject);

            wrapper.instance().setObject({ target: { value: 'new value' } });
            expect(props.setObject).toBeCalledWith('new value');
        });
    });
});
