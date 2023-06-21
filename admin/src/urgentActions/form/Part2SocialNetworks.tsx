import { TextInput } from 'react-admin';

import { MediumInput } from './MediumInput';

const Part2SocialNetworks = () => {
    return (
        <>
            <TextInput source="social_metadata.title" fullWidth label="Title" />
            <TextInput source="social_metadata.description" fullWidth label="Description" />
            <MediumInput source="social_metadata.medium" label="Cover" />
        </>
    );
};

export default Part2SocialNetworks;
