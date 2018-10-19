import { path, assocPath } from 'ramda';

import { uploadImage } from './uploadImage';

export const uploadImageFromStory = async (story = []) => {
    const images = story.map(storyStep => path(['medium', 'src'], storyStep));
    const srcs = await Promise.all(images.map(img => uploadImage(img)));

    return story.map(
        (storyStep, index) =>
            srcs[index] ? assocPath(['medium', 'src'], srcs[index], storyStep) : storyStep,
    );
};
