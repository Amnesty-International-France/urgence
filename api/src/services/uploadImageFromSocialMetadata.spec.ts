import { uploadImageFromSocialMetadata } from './uploadImageFromSocialMetadata';
import { uploadImage as uploadImageOriginal } from './uploadImage';

jest.mock('./uploadImage');

const uploadImage = jest.mocked(uploadImageOriginal, true);

describe('uploadImageFromSocialMetadata', () => {
    beforeEach(() => {
        uploadImage.mockClear();
    });
    it('should call uploadImage with all medium.src', async () => {
        await uploadImageFromSocialMetadata({ medium: { src: 'first medium src' } });
        expect(uploadImage).toHaveBeenCalledWith('first medium src');
    });

    it('should replace medium.src by uploadImage result', async () => {
        uploadImage.mockImplementation(async () => 'uploaded src');
        expect(
            await uploadImageFromSocialMetadata({ medium: { src: 'first medium src' } }),
        ).toEqual({ medium: { src: 'uploaded src' } });
    });

    it('should not call uploadImage with undefined for social metadata  with no medium, but should return the same social metadata item', async () => {
        // @ts-ignore
        uploadImage.mockImplementation((v) => v);
        // @ts-ignore
        expect(await uploadImageFromSocialMetadata({ no: 'medium' })).toEqual({ no: 'medium' });
        expect(uploadImage).not.toHaveBeenCalled();
    });
});
