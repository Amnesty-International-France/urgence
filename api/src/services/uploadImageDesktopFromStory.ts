import { path, assocPath } from 'ramda';

import { Crop, uploadImage } from './uploadImage';

export const uploadImageDesktopFromStory = async (story: string[] = []) => {
    const images = story.map((storyStep) => {
        return {
            src: path<string>(['mediumDesktop', 'src'], storyStep),
            crop: path<Crop>(['mediumDesktop', 'crop'], storyStep),
        };
    });
    const srcs = await Promise.all(images.map((img) => uploadImage(img.src as string, img.crop)));

    return story.map((storyStep, index) =>
        srcs[index] ? assocPath(['mediumDesktop', 'src'], srcs[index], storyStep) : storyStep,
    );
};
