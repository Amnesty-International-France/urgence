import { raw } from 'express';
import fs from 'fs';
import { FileUpload, Upload } from 'graphql-upload';
import sharp from 'sharp';
import shortid from 'shortid';

import config from '../../../config/index.cjs';

export type Crop = {
    unit: string;
    x: number;
    y: number;
    width: number;
    height: number;
};

const removeTimestamp = (filename: string) => {
    return filename.substring(0, filename.indexOf('?time') > -1 ? filename.indexOf('?time') : filename.length);
};

export const getSavedFileName = () => {
    const id = shortid.generate();

    return `${id}.jpeg`;
};

export type ImageUpload = string | { rawFile: Promise<Upload> };

export const uploadImage = async (upload: string | { rawFile: Promise<Upload> }, crop?: Crop) => {
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
        let filename = match[1];
        filename = removeTimestamp(filename);
        path = `${config.uploadDir}/${filename}`;
        cropPath = `${config.uploadDir}/crop-${filename}`;
    } else {
        const rawFile = await upload.rawFile;
        const stream = rawFile.file
            ? rawFile.file.createReadStream()
            : (await rawFile.promise).createReadStream();
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
            const { width, height } = await sharp(path).metadata();

            if (!width || !height || width < 10 || height < 10) {
                throw new Error('Upload failed please retry');
            }
            const { x, y } = crop;
            const cropWidthPercent = crop.width !== 0 ? crop.width : 100;
            const cropHeightPercent = crop.height !== 0 ? crop.height : 100;

            const cropX = Math.floor((x * width) / 100);
            const cropY = Math.floor((y * height) / 100);
            const cropWidth = Math.floor((width * cropWidthPercent) / 100);
            const cropHeight = Math.floor((height * cropHeightPercent) / 100);

            await sharp(path)
                .extract({ left: cropX, top: cropY, width: cropWidth, height: cropHeight })
                .toFile(cropPath);
    }

    return removeTimestamp(url) + `?time=${Date.now()}`;
};
