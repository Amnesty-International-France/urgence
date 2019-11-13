import React from 'react';
import { shallow } from 'enzyme';
import { Labeled } from 'react-admin';
import { default as BaseRichTextInput } from 'ra-input-rich-text';

import { RichTextInput } from './RichTextInput';

describe('<RichTextInput />', () => {
    const defaultProps = {
        label: 'Foo',
    };

    it('should display given label prop as label', () => {
        const props = {
            ...defaultProps,
            label: 'Message',
        };

        const wrapper = shallow(<RichTextInput {...props} />);

        const label = wrapper.find(Labeled);
        expect(label.prop('label')).toBe('Message');
    });

    it('should allow bold and italic fonts', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<RichTextInput {...props} />);

        const editor = wrapper.find(BaseRichTextInput);
        const toolbar = editor.prop('toolbar');

        expect(toolbar[0]).toContain('italic');
        expect(toolbar[0]).toContain('bold');
    });

    it('should allow all font sizes', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<RichTextInput {...props} />);

        const editor = wrapper.find(BaseRichTextInput);
        const toolbar = editor.prop('toolbar');

        expect(toolbar[0][0]).toEqual({ size: ['small', 'normal', 'large', 'huge'] });
    });

    it('should allow colors and background colors', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<RichTextInput {...props} />);

        const editor = wrapper.find(BaseRichTextInput);
        const toolbar = editor.prop('toolbar');

        expect(toolbar[1][0]).toEqual({ color: [] });
        expect(toolbar[1][1]).toEqual({ background: [] });
    });
});
