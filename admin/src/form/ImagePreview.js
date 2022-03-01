import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { ImageField } from 'react-admin';
export const ImagePreview = ({ record, ...rest }) => {
    const {
        input: { value, onChange },
        croppable,
    } = rest;
    const src = (record.rawFile && record.rawFile.preview) || record;
    const [crop, setCrop] = useState(value || {});
    return croppable ? (
        <ReactCrop
            src={src}
            crop={crop}
            onChange={newCrop => {
                setCrop(newCrop);
                console.log('onChange', value);
                onChange(newCrop);
            }}
        ></ReactCrop>
    ) : (
        <ImageField record={{ src }} source="src" {...rest} />
    );
};
