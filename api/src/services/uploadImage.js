import fs from 'fs';
import shortid from 'shortid';
import path from 'path';
import sharp from 'sharp';

import config from '../../../config';

export const getSavedFileName = () => {
    const id = shortid.generate();

    return `${id}.jpeg`;
};

export const uploadImage = async (upload, crop) => {
    if (!upload) {
        return null;
    }

    let path, cropPath, url;
    const lastUrlParam = /\/([^\/]*$)/;
    if (typeof upload === 'string') {
        url = upload;
        const filename = upload.match(lastUrlParam)[1];
        path = `${config.uploadPath}/${filename}`;
        cropPath = `${config.uploadPath}/crop-${filename}`;
    } else {
        const rawFile = await upload.rawFile;
        if (!rawFile.stream) {
            throw new Error('Upload failed please retry');
        }
        const { filename } = rawFile;
        const stream = rawFile.createReadStream();

        const savedFileName = getSavedFileName(filename);
        path = `${config.uploadDir}/${savedFileName}`;
        cropPath = `${config.uploadDir}/crop-${savedFileName}`;
        url = `${config.uploadUrl}/${savedFileName}`;
        const optimiseFile = sharp()
            .resize(1920)
            .jpeg();

        await new Promise((resolve, reject) =>
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
                .on('finish', () => resolve()),
        );
    }
    if (crop) {
        await sharp(path)
            .metadata()
            .then(({ width, height }) => {
                const { x, y, width: cropWidthPercent, height: cropHeightPercent } = crop;
                const cropX = Math.floor((x * width) / 100);
                const cropY = Math.floor((y * height) / 100);
                const cropWidth = Math.floor((width * cropWidthPercent) / 100);
                const cropHeight = Math.floor((height * cropHeightPercent) / 100);
                sharp(path)
                    .extract({ left: cropX, top: cropY, width: cropWidth, height: cropHeight })
                    .toFile(cropPath);
            });
    }
    return url;
};
