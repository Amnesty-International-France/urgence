import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { ImageField } from 'react-admin';
import { secureUseState } from '../../../front/src/hooks/secureHooks';
export const ImagePreview = ({ record, ...rest }) => {
    const {
        input: { value, onChange },
        croppable,
    } = rest;
    const src = (record.rawFile && record.rawFile.preview) || record;
    const [crop, setCrop] = secureUseState(value || { unit: '%' });
    return croppable ? (
        <ReactCrop
            src={src}
            crop={crop}
            onChange={(_, percentCrop) => {
                setCrop(percentCrop);
                onChange(percentCrop);
            }}
        ></ReactCrop>
    ) : (
        <ImageField record={{ src }} source="src" {...rest} />
    );
};
