import { path, assocPath } from 'ramda';
import { UrgentAction } from '../urgentActions/repository';

import { Crop, ImageUpload, uploadImage } from './uploadImage';

export const uploadImageDesktopFromStory = async (story: UrgentAction['story'] = []) => {
    const images = story.map((storyStep) => {
        return {
            src: path<ImageUpload>(['mediumDesktop', 'src'], storyStep),
            crop: path<Crop>(['mediumDesktop', 'crop'], storyStep),
        };
    });

    const srcs = await Promise.all(
        images.map((img) => uploadImage(img.src as ImageUpload, img.crop)),
    );
    
    return story.map((storyStep, index) =>
        srcs[index] ? assocPath(['mediumDesktop', 'src'], srcs[index], storyStep) : storyStep,
    );
};
