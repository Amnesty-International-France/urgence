import get from 'lodash.get';
import React from 'react';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';

import Story from './Story';
import Act from './Act';
import Message from './message/Message';
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
            call_to_action
            object_indication
            message_template {
                value
            }
        }
    }
`;

export const renderUrgentAction = ({ step, id }) => ({
    data,
    error,
    loading,
}) => {
    if (error) {
        console.error(error);
        return null;
    }

    if (!step) {
        return <Redirect to={generateUrl('story', { id })} />;
    }

    if (step === 'story') {
        return (
            <Story loading={loading} story={get(data, 'UrgentAction.story')} />
        );
    }

    if (step === 'act') {
        return <Act callToAction={get(data, 'UrgentAction.call_to_action')} />;
    }

    if (step === 'message') {
        return (
            <Message
                messageTemplate={get(data, 'UrgentAction.message_template')}
                objectIndication={get(data, 'UrgentAction.object_indication')}
                loading={loading}
            />
        );
    }
};

export const UrgentAction = ({
    match: {
        params: { id, step, page },
    },
}) => (
    <Query query={query} variables={{ id }}>
        {renderUrgentAction({ step, page, id })}
    </Query>
);

UrgentAction.propTypes = {
    match: routeMatch,
};

export default withRouter(UrgentAction);
