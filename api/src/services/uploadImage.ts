import fs from 'fs';
import { FileUpload } from 'graphql-upload';
import sharp from 'sharp';
import shortid from 'shortid';

import config from '../../../config';

export type Crop = {
    unit: string;
    x: number;
    y: number;
    width: number;
    height: number;
};

export const getSavedFileName = () => {
    const id = shortid.generate();

    return `${id}.jpeg`;
};

export const uploadImage = async (
    upload: string | { rawFile: Promise<FileUpload> }, // TODO Check this
    crop?: Crop,
) => {
    if (!upload) {
        return null;
    }

    let path = '',
        cropPath = '',
        url = '';
    const lastUrlParam = /\/([^\/]*$)/;
    if (typeof upload === 'string') {
        url = upload;
        const match = url.match(lastUrlParam);
        if (!match) {
            throw new Error('Upload failed please retry');
        }
        const filename = match[1];
        path = `${config.uploadDir}/${filename}`;
        cropPath = `${config.uploadDir}/crop-${filename}`;
    } else {
        const rawFile = await upload.rawFile;

        const stream = rawFile.createReadStream();
        const savedFileName = getSavedFileName();
        path = `${config.uploadDir}/${savedFileName}`;
        cropPath = `${config.uploadDir}/crop-${savedFileName}`;
        url = `${config.uploadUrl}/${savedFileName}`;
        const optimizeFile = sharp().resize(1920).jpeg();

        await new Promise<void>((resolve, reject) =>
            stream
                .on('error', (error) => {
                    if (stream.isPaused()) {
                        // Delete the truncated file
                        fs.unlinkSync(path);
                    }
                    reject(error);
                })
                .pipe(optimizeFile)
                .pipe(fs.createWriteStream(path))
                .on('error', reject)
                .on('finish', () => resolve()),
        );
    }
    if (crop) {
        await sharp(path)
            .metadata()
            .then(({ width, height }) => {
                if (!width || !height) {
                    throw new Error('Upload failed please retry');
                }
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
