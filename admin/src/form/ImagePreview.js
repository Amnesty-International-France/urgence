import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
export const ImagePreview = ({ record, ...props }) => {
    const src = (record.rawFile && record.rawFile.preview) || record;
    const [crop, setCrop] = useState({});
    return <ReactCrop src={src} crop={crop} onChange={newCrop => setCrop(newCrop)}></ReactCrop>;
};
