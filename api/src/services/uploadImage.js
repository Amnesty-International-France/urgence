export default async upload => {
    if (!upload) {
        return null;
    }
    const result = await upload;
    // const { id, path } = await storeFS({ stream, filename });
    // return storeDB({ id, filename, mimetype, encoding, path });
    console.log({ result });
    return 'uploaded';
}
