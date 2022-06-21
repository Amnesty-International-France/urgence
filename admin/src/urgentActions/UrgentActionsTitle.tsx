import { useRecordContext } from 'react-admin';

export const UrgentActionsTitle = () => {
    const record = useRecordContext();
    return <span>{record ? `${record.title}` : ''}</span>;
};
