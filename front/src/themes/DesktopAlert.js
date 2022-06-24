import React, { useEffect } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

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
    const [show, setShow] = React.useState(false);

    useEffect(() => {
        const url = window.location.href;
        if (url.includes('/story/0')) {
            setShow(true);
        }
    });

    return (
        <Query query={query}>
            {({ data, loading, error }) => {
                if (loading || error || !show) {
                    return null;
                }
                return <Alert message={data.SettingByType.content} />;
            }}
        </Query>
    );
};

export default DesktopAlert;
