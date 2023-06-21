import QRCode from 'react-qr-code';
import { RaRecord, useRecordContext } from 'react-admin';
import styled from '@emotion/styled';

const styles = {
    height: 'auto',
    maxWidth: 200,
    width: '100%',
    margin: '0.5rem 0',
    '& .preview-title': {
        marginBottom: '0.5rem',
        textAlign: 'center',
        fontSize: '1.2rem',
        display: 'block',
        width: '160px',
        position: 'relative',
    },
    '& .preview-title:before': {
        content: '""',
        display: 'block',
        width: '35px',
        height: '2px',
        background: 'black',
        left: 0,
        top: '50%',
        position: 'absolute',
    },
    '& .preview-title:after': {
        content: '""',
        display: 'block',
        width: '35px',
        height: '2px',
        background: 'black',
        right: 0,
        top: ' 50%',
        position: 'absolute',
    },
};

const hasStory = (record: RaRecord): boolean => record.story && record.story.length > 0;

const PreviewQrCodeUnstyled = ({ className }: { className?: string }) => {
    const record = useRecordContext();
    if (!record || !hasStory(record)) {
        return null;
    }

    return (
        <div className={className}>
            <a
                href={`${process.env.REACT_APP_FRONT_BASE_URL}/ua/${record.slug}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <QRCode
                    size={256}
                    style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                    value={`${process.env.REACT_APP_FRONT_BASE_URL}/ua/${record.slug}`}
                    viewBox={`0 0 256 256`}
                />
            </a>
        </div>
    );
};

// @ts-expect-error TS(2769): No overload matches this call.
const PreviewQrCode = styled(PreviewQrCodeUnstyled)(styles);

export default PreviewQrCode;
