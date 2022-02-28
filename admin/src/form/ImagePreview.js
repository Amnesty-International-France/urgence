import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
export const ImagePreview = ({ record, ...rest }) => {
    const {
        input: { value, onChange },
    } = rest;
    const src = (record.rawFile && record.rawFile.preview) || record;
    const [crop, setCrop] = useState(value || {});
    return (
        <ReactCrop
            src={src}
            crop={crop}
            onChange={newCrop => {
                setCrop(newCrop);
                console.log('onChange', value);
                onChange(newCrop);
            }}
        ></ReactCrop>
    );
};
