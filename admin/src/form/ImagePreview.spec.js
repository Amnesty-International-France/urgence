import React from 'react';
import { shallow } from 'enzyme';
import { ImageField } from 'react-admin';

import { ImagePreview } from './ImagePreview';

describe('ImagePreview', () => {
    beforeEach(() => {
        jest.spyOn(React, 'useState').mockImplementation(() => [{}, () => {}]);
    });
    it('should render ImageField with record props from props.record', () => {
        const wrapper = shallow(
            <ImagePreview record="imageUrl" input={{ value: undefined, onChange: undefined }} />,
        );
        expect(wrapper.find(ImageField).prop('record')).toEqual({ src: 'imageUrl' });
    });

    it('should render ImageField with record props from props.record.rawFile.preview', () => {
        const wrapper = shallow(
            <ImagePreview
                record={{ rawFile: { preview: 'imageUrl' } }}
                input={{ value: undefined, onChange: undefined }}
            />,
        );
        expect(wrapper.find(ImageField).prop('record')).toEqual({ src: 'imageUrl' });
    });
});
