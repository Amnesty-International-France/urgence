import { ArrayInput, SimpleFormIterator } from 'react-admin';

import { CustomAddButton } from './CustomAddButton';
import { StoryTemplateInput } from './StoryTemplateInput';

export const Part3Story = () => {
    return (
        <ArrayInput
            source="story"
            label={false}
            sx={{
                '& .RaSimpleFormIterator-indexContainer': {
                    padding: 0,
                },
                '& .RaSimpleFormIterator-index': {
                    borderRadius: '50%',
                    color: '#fff',
                    backgroundColor: 'primary.main',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '1.25rem',
                },
            }}
        >
            <SimpleFormIterator disableReordering addButton={<CustomAddButton />}>
                <StoryTemplateInput />
            </SimpleFormIterator>
        </ArrayInput>
    );
};

export default Part3Story;
