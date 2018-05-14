import React from 'react';
import { shallow } from 'enzyme';
import { ImageField } from 'react-admin';

import { ImagePreview } from './ImagePreview';

describe('ImagePreview', () => {
    it('should render ImageField with record props from props.record', () => {
        const wrapper = shallow(<ImagePreview record="imageUrl" />);
        expect(wrapper.find(ImageField).prop('record')).toEqual({ src: 'imageUrl' });
    });

    it('should render ImageField with record props from props.record.rawFile.preview', () => {
        const wrapper = shallow(<ImagePreview record={{ rawFile: { preview: 'imageUrl' } }} />);
        expect(wrapper.find(ImageField).prop('record')).toEqual({ src: 'imageUrl' });
    });
});
