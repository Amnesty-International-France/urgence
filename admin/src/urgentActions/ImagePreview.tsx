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

const CroppableImagePreview = ({
    parentField,
    src,
}: {
    parentField: string;
    src: string;
}) => {
    const { field } = useInput({ source: `${parentField}.crop` });
    const previousImage = useRef<string>();
    const [crop, setCrop] = useState<Crop | undefined>(field.value);

    useEffect(() => {
        if (!!previousImage.current && previousImage.current !== src) {
            setCrop(undefined);
            field.onChange(null);
        }
        previousImage.current = src;
    }, [field, src]);

    return (
        <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(_, completePercentCrop) => field.onChange(completePercentCrop)}
        >
            <img alt="Crop me" src={src} />
        </ReactCrop>
    );
};

export const ImagePreview = ({ parentField, record, croppable }: ImagePreviewProps) => {
    const src = ((record && record.src) || record) as string;

    if (!record) {
        return null;
    }

    return (
        <Box sx={{ margin: '0 0.5rem 0.5rem', '& img': { maxHeight: '9rem' } }}>
            {croppable ? (
                <CroppableImagePreview parentField={parentField} src={src} />
            ) : (
                <ImageField record={{ src }} source="src" />
            )}
        </Box>
    );
};
