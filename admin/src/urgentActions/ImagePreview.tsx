import { ImageField } from 'react-admin';

type ImagePreviewProps = {
    source: string;
};

export const ImagePreview = ({ source }: ImagePreviewProps) => {
    return (
        <ImageField
            source={`${source}.src`}
            sx={{ margin: '0 0.5rem 0.5rem', '& img': { maxHeight: '9rem' } }}
        />
    );
};
