import {
    getActivist,
    getActivists,
    countActivists,
    createActivist,
    removeActivist,
} from './repository';

export default {
    Query: {
        Activist: (_, { id }) => getActivist(id),
        allActivists: (_, { perPage, page, sortField, sortOrder }) =>
            getActivists({ perPage, page, sortField, sortOrder }),
        _allActivistsMeta: () => countActivists(),
    },
    Mutation: {
        createActivist: async (_, activist) => createActivist(activist),
        deleteActivist: async (_, id) => removeActivist(id),
    },
};
