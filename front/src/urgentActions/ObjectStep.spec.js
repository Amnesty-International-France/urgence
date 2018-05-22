import React from 'react';
import { shallow } from 'enzyme';

import { ObjectStep } from './ObjectStep';
import sessionData from '../sessionData';

jest.mock('../sessionData');

sessionData.getMailObject.mockImplementation(() => 'session object value');

describe('<ObjectStep />', () => {
    const defaultProps = {
        object: 'object value',
        objectIndication:
            'Indiquez par exemple que vous souhaitez parler de cette situation inacceptable.',
        messageTemplate: [],
    };

    it('should display objectIndication as HTML', () => {
        const props = {
            ...defaultProps,
            objectIndication: '<p>hello world</p>',
        };

        const wrapper = shallow(<ObjectStep {...props} />);
        const richText = wrapper.find('RichText');
        expect(richText.prop('html')).toBe('<p>hello world</p>');
    });

    it('should display a input with value = props.object', () => {
        const wrapper = shallow(<ObjectStep {...defaultProps} />);
        const input = wrapper.find('input');
        expect(input.prop('value')).toBe('session object value');
    });

    it('should call sessionData.setMailObject with event value when triggering input onChange', () => {
        const wrapper = shallow(<ObjectStep {...defaultProps} />);
        const input = wrapper.find('input');

        input.simulate('change', { target: { value: 'new value' } });
        expect(sessionData.setMailObject).toHaveBeenCalledWith('new value');
    });
});
