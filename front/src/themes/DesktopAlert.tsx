import { useQuery, gql } from '@apollo/client';
import React, { useEffect, useState } from 'react';

import Alert from './Alert';

const query = gql`
    {
        SettingByType(type: "desktop-alert") {
            id
            type
            content
        }
    }
`;

const DesktopAlert = () => {
    const [show, setShow] = useState(false);
    const { data, loading, error } = useQuery(query);

    useEffect(() => {
        const url = window.location.href;
        if (url.includes('/story/0')) {
            setShow(true);
        }
    }, []);

    if (!show || loading || error) {
        return null;
    }
    // @ts-ignore
    return <Alert message={data?.SettingByType?.content} />;
};

export default DesktopAlert;
