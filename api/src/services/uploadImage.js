import fs from 'fs';
import shortid from 'shortid';

import config from '../../../config';

export const uploadImage = async upload => {
    if (!upload) {
        return null;
    }

    if (typeof upload === 'string') {
        return upload;
    }

    const rawFile = await upload.rawFile;
    if (!rawFile.stream) {
        throw new Error('Upload failed please retry');
    }
    const { stream, filename } = rawFile;

    const id = shortid.generate();
    const savedFilename = `${id}-${filename}`;
    const path = `${config.uploadDir}/${savedFilename}`;

    return new Promise((resolve, reject) =>
        stream
            .on('error', error => {
                if (stream.truncated) {
                    // Delete the truncated file
                    fs.unlinkSync(path);
                }
                reject(error);
            })
            .pipe(fs.createWriteStream(path))
            .on('error', reject)
            .on('finish', () => resolve(savedFilename))
    );
}
