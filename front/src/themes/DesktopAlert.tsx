import React, { useEffect } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';

// @ts-expect-error TS(6142): Module './Alert' was resolved to '/home/guillaume/... Remove this comment to see the full error message
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
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Query query={query}>
            {({ data, loading, error }: any) => {
                if (loading || error || !show) {
                    return null;
                }
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                return <Alert message={data.SettingByType.content} />;
            }}
        </Query>
    );
};

export default DesktopAlert;
