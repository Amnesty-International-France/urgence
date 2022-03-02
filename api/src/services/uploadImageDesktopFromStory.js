import { path, assocPath } from 'ramda';

import { uploadImage } from './uploadImage';

export const uploadImageDesktopFromStory = async (story = []) => {
    const images = story.map(storyStep => {
        return {
            src: path(['mediumDesktop', 'src'], storyStep),
            crop: path(['mediumDesktop', 'crop'], storyStep),
        };
    });
    const srcs = await Promise.all(images.map(img => uploadImage(img.src, img.crop)));

    return story.map((storyStep, index) =>
        srcs[index] ? assocPath(['mediumDesktop', 'src'], srcs[index], storyStep) : storyStep,
    );
};
