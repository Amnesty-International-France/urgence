import { ImageField } from 'react-admin';

type ImagePreviewProps = {
    source: string;
    record?: any;
};

export const ImagePreview = ({ source, record }: ImagePreviewProps) => {
    if (!record && !record.src) {
        return null;
    }

    return (
        <ImageField
            record={record}
            source={source}
            sx={{ margin: '0 0.5rem 0.5rem', '& img': { maxHeight: '9rem' } }}
        />
    );
};
