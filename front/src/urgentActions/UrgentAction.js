import get from 'lodash.get';
import React from 'react';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';

import Story from './Story';
import { routeMatch } from '../propTypes';
import generateUrl from '../services/generateUrl';

const query = gql`
    query urgentAction($id: ID!) {
        UrgentAction(id: $id) {
            story {
                displayOptions {
                    mediumPosition
                    backgroundColor
                }
                medium {
                    src
                    title
                }
                content
            }
        }
    }
`;

export const UrgentAction = ({
    match: {
        params: { id, step, page },
    },
}) => (
    <Query query={query} variables={{ id }}>
        {({ data, error, loading }) => {
            if (error) {
                console.error(error);
                return null;
            }

            if (!step) {
                return <Redirect to={generateUrl('story', { id })} />;
            }

            if (!step || step === 'story') {
                return (
                    <Story
                        loading={loading}
                        story={get(data, 'UrgentAction.story')}
                        page={page}
                    />
                );
            }

            if (step === 'message') {
                return 'message';
            }
        }}
    </Query>
);

UrgentAction.propTypes = {
    match: routeMatch,
};

export default withRouter(UrgentAction);
