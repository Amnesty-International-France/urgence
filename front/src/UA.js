import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Text, View } from 'react-primitives';
import { withRouter } from 'react-router';

import Title from './themes/Title';

const UA = ({
    match: {
        params: { id },
    },
}) => (
    <Query
        query={gql`
            query urgentAction($id: ID!) {
                UrgentAction(id: $id) {
                    id
                    title
                }
            }
        `}
        variables={{ id }}
    >
        {({ loading, error, data }) => {
            if (loading) {
                return (
                    <View>
                        <Text>Loading...</Text>
                    </View>
                );
            }
            if (error) {
                return <Text>Error: {error.message}</Text>;
            }

            if (!data.UrgentAction) {
                return <Title>Not found</Title>;
            }

            return <Title>{data.UrgentAction.title}</Title>;
        }}
    </Query>
);

UA.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }),
    }).isRequired,
};

export default withRouter(UA);
