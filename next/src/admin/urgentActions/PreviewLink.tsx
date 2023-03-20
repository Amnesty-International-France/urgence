import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import { RaRecord, useRecordContext } from 'react-admin';

const hasStory = (record: RaRecord): boolean => record.story && record.story.length > 0;

export const PreviewLink = () => {
    const record = useRecordContext();
    if (!record) {
        return null;
    }
    return (
        <Button
            color="primary"
            size="small"
            href={`/ua/${record.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            disabled={!hasStory(record)}
            role="button"
        >
            <VisibilityIcon />
            &nbsp;View
        </Button>
    );
};

export default PreviewLink;
