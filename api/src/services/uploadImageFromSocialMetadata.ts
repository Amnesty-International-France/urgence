import { path, assocPath } from 'ramda';
import { SocialMetadata } from '../urgentActions/repository';

import { uploadImage } from './uploadImage';

export const uploadImageFromSocialMetadata = async (
    socialMetadata: Partial<SocialMetadata> = {},
) => {
    const image = path<string>(['medium', 'src'], socialMetadata);
    if (!image) {
        return socialMetadata;
    }
    const src = await uploadImage(image);

    return src ? assocPath(['medium', 'src'], src, socialMetadata) : socialMetadata;
};
