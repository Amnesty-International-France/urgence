import fs from 'fs';
import shortid from 'shortid';
import path from 'path';
import sharp from 'sharp';

import config from '../../../config';

export const getSavedFileName = () => {
    const id = shortid.generate();

    return `${id}.jpeg`;
};

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
    const { filename } = rawFile;
    const stream = rawFile.createReadStream();

    const savedFileName = getSavedFileName(filename);
    const path = `${config.uploadDir}/${savedFileName}`;
    const url = `${config.uploadUrl}/${savedFileName}`;
    const optimiseFile = sharp()
        .resize(1920)
        .jpeg();

    return new Promise((resolve, reject) =>
        stream
            .on('error', error => {
                if (stream.truncated) {
                    // Delete the truncated file
                    fs.unlinkSync(path);
                }
                reject(error);
            })
            .pipe(optimiseFile)
            .pipe(fs.createWriteStream(path))
            .on('error', reject)
            .on('finish', () => resolve(url)),
    );
};
