import { path, assocPath } from 'ramda';

import { uploadImage } from './uploadImage';

export const uploadImageFromSocialMetadata = async (socialMetadata = {}) => {
    const image = path(['medium', 'src'], socialMetadata);
    const src = await uploadImage(image);

    return src ? assocPath(['medium', 'src'], src, socialMetadata) : socialMetadata;
};
