import { uploadImageDesktopFromStory } from './uploadImageDesktopFromStory';
import { uploadImage as uploadImageOriginal } from './uploadImage';
import { StoryStep } from '../urgentActions/repository';

jest.mock('./uploadImage');
const uploadImage = jest.mocked(uploadImageOriginal, true);

describe('uploadImageFromStory', () => {
    it('should call uploadImage with all mediumDesktop.src', async () => {
        await uploadImageDesktopFromStory([
            { mediumDesktop: { src: 'first mediumDesktop src' } } as StoryStep,
            { mediumDesktop: { src: 'second mediumDesktop src' } } as StoryStep,
        ]);
        expect(uploadImage).toHaveBeenCalledWith('first mediumDesktop src', undefined);
        expect(uploadImage).toHaveBeenCalledWith('second mediumDesktop src', undefined);
    });

    it('should replace mediumDesktop.src by uploadImage result', async () => {
        // @ts-ignore
        uploadImage.mockImplementation(() => 'uploaded src');
        expect(
            await uploadImageDesktopFromStory([
                { mediumDesktop: { src: 'first mediumDesktop src' } } as StoryStep,
                { mediumDesktop: { src: 'second mediumDesktop src' } } as StoryStep,
            ]),
        ).toEqual([
            { mediumDesktop: { src: 'uploaded src' } },
            { mediumDesktop: { src: 'uploaded src' } },
        ]);
    });

    it('should call uploadImage with undefined for storystep with no mediumDesktop and do not change the story item', async () => {
        // @ts-ignore
        uploadImage.mockImplementation((v) => v); // @ts-ignore
        expect(await uploadImageDesktopFromStory([{ no: 'mediumDesktop' }])).toEqual([
            { no: 'mediumDesktop' },
        ]);

        expect(uploadImage).toHaveBeenCalledWith(undefined, undefined);
    });
});
