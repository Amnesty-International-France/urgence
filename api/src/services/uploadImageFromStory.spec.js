import uploadImageFromStory from './uploadImageFromStory';
import uploadImage from './uploadImage';

jest.mock('./uploadImage');

describe('uploadImageFromStory', () => {
    it('should call uploadImage with all medium.src and replace it by the result', async () => {
        uploadImage.mockImplementation(v => v ? `uploaded ${v}` : v);
        expect(await uploadImageFromStory([
            { medium: { src: 'medium src' } },
            { no: 'medium' },
        ])).toEqual([
            { medium: { src: 'uploaded medium src' } },
            { no: 'medium', medium: { src: undefined } },
        ]);
        expect(uploadImage).toHaveBeenCalledWith('medium src');
        expect(uploadImage).toHaveBeenCalledWith(undefined);
    });
});
