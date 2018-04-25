import { uploadImageFromStory } from './uploadImageFromStory';
import { uploadImage } from './uploadImage';

jest.mock('./uploadImage');

describe('uploadImageFromStory', () => {
    it('should call uploadImage with all medium.src', async () => {
        await uploadImageFromStory([
            { medium: { src: 'first medium src' } },
            { medium: { src: 'second medium src' } },
        ]);
        expect(uploadImage).toHaveBeenCalledWith('first medium src');
        expect(uploadImage).toHaveBeenCalledWith('second medium src');
    });

    it('should replace medium.src by uploadImage result', async () => {
        uploadImage.mockImplementation(() => 'uploaded src');
        expect(await uploadImageFromStory([
            { medium: { src: 'first medium src' } },
            { medium: { src: 'second medium src' } },
        ])).toEqual([
            { medium: { src: 'uploaded src' } },
            { medium: { src: 'uploaded src' } },
        ]);
    });

    it('should call uploadImage with undefined for storystep with no medium and initialize medium with no src', async () => {
        uploadImage.mockImplementation(v => v);
        expect(await uploadImageFromStory([
            { no: 'medium' },
        ])).toEqual([
            { no: 'medium', medium: { src: undefined } },
        ]);

        expect(uploadImage).toHaveBeenCalledWith(undefined);
    });
});
