import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import { Query } from 'react-apollo';

const UrgentAction = ({ title }) => (
    <div>
        <h1>Title: {title}</h1>
    </div>
);

UrgentAction.propTypes = {
    title: PropTypes.string.isRequired,
};

const query = gql`
    query urgentAction($id: ID!) {
        UrgentAction(id: $id) {
            id
            title
        }
    }
`;

export const UrgentActionWithQuery = ({
    match: {
        params: { id },
    },
}) => (
    <Query query={query} variables={{ id }}>
        {({ data }) => <UrgentAction {...data.UrgentAction} />}
    </Query>
);

UrgentActionWithQuery.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }).isRequired,
    }),
};

export default withRouter(UrgentActionWithQuery);
