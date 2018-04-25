const omitDeep = keys => data => {
    if (Array.isArray(data)) {
        return data.map(data => omitDeep(keys)(data));
    }
    if (Object.prototype.toString.call(data) === '[object Object]') {
        return Object.keys(data).reduce((acc, key) => {
            if (keys.indexOf(key) !== -1) {
                return acc;
            }

            return {
                ...acc,
                [key]: omitDeep(keys)(data[key]),
            };
        }, {});
    }
    return data;
}

export default omitDeep;
