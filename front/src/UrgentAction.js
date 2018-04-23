import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';

import Title from './themes/Title';
import GraphqlQuery from './helperComponents/GraphqlQuery';

export const renderUA = data =>
    data.UrgentAction ? (
        <Title>{data.UrgentAction.title}</Title>
    ) : (
        <Title>Not Found</Title>
    );

const UAquery = gql`
    query urgentAction($id: ID!) {
        UrgentAction(id: $id) {
            id
            title
        }
    }
`;

const UA = ({ match: { params } }) => (
    <GraphqlQuery query={UAquery} variables={params} render={renderUA} />
);

UA.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }),
    }).isRequired,
};

export default withRouter(UA);
