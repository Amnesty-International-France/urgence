import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { DataProvider } from '../DataContext';
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
    return (
        <DataProvider>
            <Query query={query}>
                {({ data, loading, error }) => {
                    if (loading || error) {
                        return null;
                    }
                    return <Alert message={data.SettingByType.content} />;
                }}
            </Query>
        </DataProvider>
    );
};

export default DesktopAlert;
