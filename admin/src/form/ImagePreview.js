import React from 'react';


import { ImageField } from 'react-admin';

export const ImagePreview = ({ record }) => {
    const src = record.rawFile && record.rawFile.preview || `${process.env.REACT_APP_API_URL}/static/${record}`;

    return (
        <ImageField record={{ src }} source="src" />
    );
}
