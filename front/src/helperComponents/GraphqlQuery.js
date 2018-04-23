import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Text, View } from 'react-primitives';

const GraphqlQuery = ({ query, variables, render }) => (
    <Query query={query} variables={variables}>
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

            return render(data);
        }}
    </Query>
);

GraphqlQuery.propTypes = {
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
    render: PropTypes.func.isRequired,
};

export default GraphqlQuery;
