import fs from 'fs';
import shortid from 'shortid';

import config from '../../../config';

export default async upload => {
    if (!upload) {
        return null;
    }

    if (typeof upload === 'string') {
        return upload;
    }
    const { stream, filename } = await upload.rawFile;

    const id = shortid.generate();
    const path = `${config.uploadDir}/${id}-${filename}`;
    const url = `${config.uploadUrl}/${id}-${filename}`;

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
