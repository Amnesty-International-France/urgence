import Box from '@mui/material/Box';
import { useEffect, useRef, useState } from 'react';
import { ImageField, RaRecord, useInput } from 'react-admin';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

type ImagePreviewProps = {
    source: string;
    parentField: string;
    record?: RaRecord;
    croppable?: boolean;
};

export const ImagePreview = ({ parentField, record, croppable }: ImagePreviewProps) => {
    const { field } = useInput({ source: `${parentField}.crop` });
    const previousImage = useRef();
    const [crop, setCrop] = useState<Crop | undefined>(field.value);

    const src = (record && record.src) || record;

    useEffect(() => {
        if (!!previousImage.current && previousImage.current !== src) {
            setCrop(undefined);
            field.onChange(null);
        }
        previousImage.current = src;
    }, [src]);

    if (!record) {
        return null;
    }

    return (
        <Box sx={{ margin: '0 0.5rem 0.5rem', '& img': { maxHeight: '9rem' } }}>
            {croppable ? (
                <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(_, completePercentCrop) => field.onChange(completePercentCrop)}
                >
                    <img alt="Crop me" src={src} />
                </ReactCrop>
            ) : (
                <ImageField record={{ src }} source="src" />
            )}
        </Box>
    );
};
