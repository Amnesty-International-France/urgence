import { path, assocPath } from 'ramda';

import { uploadImage } from './uploadImage';

export const uploadImageFromStory = async (story: string[] = []) => {
    const images = story.map((storyStep) => {
        return {
            src: path<string>(['medium', 'src'], storyStep),
            crop: path<string>(['medium', 'crop'], storyStep),
        };
    });
    const srcs = await Promise.all(images.map((img) => uploadImage(img.src, img.crop)));

    return story.map((storyStep, index) =>
        srcs[index] ? assocPath(['medium', 'src'], srcs[index], storyStep) : storyStep,
    );
};
