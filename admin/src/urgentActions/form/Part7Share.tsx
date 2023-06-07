import { ShareInput } from '../ShareInput';

export const Part7Share = () => {
    return (
        <>
            <p>Share (only for members already registered)</p>
            <ShareInput source="email_thank" />
        </>
    );
};

export default Part7Share;
