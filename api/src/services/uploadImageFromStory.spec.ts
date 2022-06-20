import { uploadImageFromStory } from './uploadImageFromStory';
import { uploadImage as uploadImageOriginal } from './uploadImage';
import { StoryStep } from '../urgentActions/repository';

jest.mock('./uploadImage');

const uploadImage = jest.mocked(uploadImageOriginal, true);

describe('uploadImageFromStory', () => {
    it('should call uploadImage with all medium.src', async () => {
        await uploadImageFromStory([
            { medium: { src: 'first medium src' } } as StoryStep,
            { medium: { src: 'second medium src' } } as StoryStep,
        ]);
        expect(uploadImage).toHaveBeenCalledWith('first medium src', undefined);
        expect(uploadImage).toHaveBeenCalledWith('second medium src', undefined);
    });

    it('should replace medium.src by uploadImage result', async () => {
        uploadImage.mockImplementation(async () => 'uploaded src');
        expect(
            await uploadImageFromStory([
                { medium: { src: 'first medium src' } } as StoryStep,
                { medium: { src: 'second medium src' } } as StoryStep,
            ]),
        ).toEqual([{ medium: { src: 'uploaded src' } }, { medium: { src: 'uploaded src' } }]);
    });

    it('should call uploadImage with undefined for storystep with no medium and do not change the story item', async () => {
        // @ts-ignore
        uploadImage.mockImplementation((v) => v);
        // @ts-ignore
        expect(await uploadImageFromStory([{ no: 'medium' } as StoryStep])).toEqual([
            { no: 'medium' },
        ]);

        expect(uploadImage).toHaveBeenCalledWith(undefined, undefined);
    });
});
