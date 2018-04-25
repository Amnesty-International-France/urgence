import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import { Query } from 'react-apollo';
import Story from './Story';

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
        params: { id },
    },
}) => (
    <Query query={query} variables={{ id }}>
        {({ data, error, loading }) => {
            if (error) {
                console.error(error);
                return null;
            }

            return (
                <Story
                    loading={loading}
                    story={get(data, 'UrgentAction.story')}
                />
            );
        }}
    </Query>
);

UrgentAction.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }).isRequired,
    }),
};

export default withRouter(UrgentAction);
