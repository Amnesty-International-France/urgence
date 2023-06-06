import QRCode from 'react-qr-code';
import { RaRecord, useRecordContext } from 'react-admin';

const hasStory = (record: RaRecord): boolean => record.story && record.story.length > 0;

export const PreviewQrCode = () => {
    const record = useRecordContext();
    if (!record || !hasStory(record)) {
        return null;
    }

    return (
        <div style={{ height: 'auto', margin: '0 auto', maxWidth: 200, width: '100%' }}>
            <QRCode
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={`${process.env.REACT_APP_FRONT_BASE_URL}/ua/${record.slug}`}
                viewBox={`0 0 256 256`}
            />
        </div>
    );
};

export default PreviewQrCode;
