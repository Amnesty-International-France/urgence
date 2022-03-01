import { path, assocPath } from 'ramda';

import { uploadImage } from './uploadImage';

export const uploadImageFromStory = async (story = []) => {
    const images = story.map(storyStep => {
        return {
            src: path(['medium', 'src'], storyStep),
            crop: path(['medium', 'crop'], storyStep),
        };
    });
    const srcs = await Promise.all(images.map(img => uploadImage(img.src, img.crop)));

    return story.map((storyStep, index) =>
        srcs[index] ? assocPath(['medium', 'src'], srcs[index], storyStep) : storyStep,
    );
};
