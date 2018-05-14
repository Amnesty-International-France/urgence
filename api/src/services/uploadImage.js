import fs from 'fs';
import shortid from 'shortid';

import config from '../../../config';

export const getSavedFileName = filename => {
    const extension = filename.split('.').pop();
    const id = shortid.generate();

    return `${id}.${extension}`;
}

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

    const savedFileName = getSavedFileName(filename);
    const path = `${config.uploadDir}/${savedFileName}`;
    const url = `${config.uploadUrl}/${savedFileName}`;

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
            .on('finish', () => resolve(url))
    );
}
