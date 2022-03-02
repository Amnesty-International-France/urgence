import { uploadImageDesktopFromStory } from './uploadImageDesktopFromStory';
import { uploadImage } from './uploadImage';

jest.mock('./uploadImage');

describe('uploadImageFromStory', () => {
    it('should call uploadImage with all mediumDesktop.src', async () => {
        await uploadImageDesktopFromStory([
            { mediumDesktop: { src: 'first mediumDesktop src' } },
            { mediumDesktop: { src: 'second mediumDesktop src' } },
        ]);
        expect(uploadImage).toHaveBeenCalledWith('first mediumDesktop src', undefined);
        expect(uploadImage).toHaveBeenCalledWith('second mediumDesktop src', undefined);
    });

    it('should replace mediumDesktop.src by uploadImage result', async () => {
        uploadImage.mockImplementation(() => 'uploaded src');
        expect(
            await uploadImageDesktopFromStory([
                { mediumDesktop: { src: 'first mediumDesktop src' } },
                { mediumDesktop: { src: 'second mediumDesktop src' } },
            ]),
        ).toEqual([
            { mediumDesktop: { src: 'uploaded src' } },
            { mediumDesktop: { src: 'uploaded src' } },
        ]);
    });

    it('should call uploadImage with undefined for storystep with no mediumDesktop and do not change the story item', async () => {
        uploadImage.mockImplementation(v => v);
        expect(await uploadImageDesktopFromStory([{ no: 'mediumDesktop' }])).toEqual([
            { no: 'mediumDesktop' },
        ]);

        expect(uploadImage).toHaveBeenCalledWith(undefined, undefined);
    });
});
