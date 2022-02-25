import { uploadImageFromSocialMetadata } from './uploadImageFromSocialMetadata';
import { uploadImage } from './uploadImage';

jest.mock('./uploadImage');

describe('uploadImageFromSocialMetadata', () => {
    it('should call uploadImage with all medium.src', async () => {
        await uploadImageFromSocialMetadata({ medium: { src: 'first medium src' } });
        expect(uploadImage).toHaveBeenCalledWith('first medium src');
    });

    it('should replace medium.src by uploadImage result', async () => {
        uploadImage.mockImplementation(() => 'uploaded src');
        expect(
            await uploadImageFromSocialMetadata({ medium: { src: 'first medium src' } }),
        ).toEqual({ medium: { src: 'uploaded src' } });
    });

    it('should call uploadImage with undefined for social metadata  with no medium and do not change the social metadata item', async () => {
        uploadImage.mockImplementation(v => v);
        expect(await uploadImageFromSocialMetadata({ no: 'medium' })).toEqual({ no: 'medium' });
        expect(uploadImage).toHaveBeenCalledWith(undefined);
    });
});
