import { Upload } from 'graphql-upload';
import { path, assocPath } from 'ramda';
import { UrgentAction } from '../urgentActions/repository';

import { Crop, ImageUpload, uploadImage } from './uploadImage';

export const uploadImageFromStory = async (story: UrgentAction['story'] = []) => {
    const images = story.map((storyStep) => {
        return {
            src: path<ImageUpload>(['medium', 'src'], storyStep),
            crop: path<Crop>(['medium', 'crop'], storyStep),
        };
    });

    const srcs = await Promise.all(
        images.map((img) => uploadImage(img.src as ImageUpload, img.crop)),
    );
    
    return story.map((storyStep, index) =>
        srcs[index] ? assocPath(['medium', 'src'], srcs[index], storyStep) : storyStep,
    );
};
