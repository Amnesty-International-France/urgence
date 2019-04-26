import React from 'react';

import { ImageField } from 'react-admin';

export const ImagePreview = ({ record, ...props }) => {
    const src = (record.rawFile && record.rawFile.preview) || record;
    return <ImageField record={{ src }} source="src" {...props} />;
};
