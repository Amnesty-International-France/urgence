import React from 'react';
import { shallow } from 'enzyme';

import { ObjectStep } from './ObjectStep';
import sessionData from '../../sessionData';

jest.mock('../../sessionData');

describe('<ObjectStep />', () => {
    const defaultProps = {
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

    it('should display a textarea with value = session.data.getMailObject()', () => {
        sessionData.getMailObject.mockImplementation(() => 'object in storage');

        const wrapper = shallow(<ObjectStep {...defaultProps} />);
        const textarea = wrapper.find('textarea');
        expect(textarea.prop('value')).toBe('object in storage');
    });

    it('should call sessionData.setMailObject with event value when triggering textarea onChange', () => {
        const wrapper = shallow(<ObjectStep {...defaultProps} />);
        const textarea = wrapper.find('textarea');

        textarea.simulate('change', { target: { value: 'new value' } });
        expect(sessionData.setMailObject).toHaveBeenCalledWith('new value');
    });
});
