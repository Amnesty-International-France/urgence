import get from 'lodash.get';
import React from 'react';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';

import sessionData from '../sessionData';
import { Email } from '../icons';
import Story from './Story';
import Act from './Act';
import Thanks from './Thanks';
import Message from './message/Message';
import ObjectStep from './ObjectStep';
import { routeMatch } from '../propTypes';
import generateUrl from '../services/generateUrl';
import ToObjectButton from './ToObjectButton';

const query = gql`
    query urgentAction($id: ID!) {
        UrgentAction(id: $id) {
            story {
                displayOptions {
                    mediumPosition
                    backgroundColor
                    color
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
            recipient {
                mail
                copies_to
                cci
            }
            email_thank {
                title
                text
            }
        }
    }
`;

export const renderUrgentAction = ({ step, id }) => ({ data, error, loading }) => {
    if (error) {
        console.error(error);
        return null;
    }

    if (!step) {
        return <Redirect to={generateUrl('story', { id })} />;
    }

    if (step === 'story') {
        return <Story loading={loading} story={get(data, 'UrgentAction.story')} />;
    }

    if (step === 'act') {
        return <Act callToAction={get(data, 'UrgentAction.call_to_action')} />;
    }

    if (step === 'message') {
        return (
            <Message
                messageTemplate={get(data, 'UrgentAction.message_template')}
                recipient={get(data, 'UrgentAction.recipient')}
                loading={loading}
                action={<ToObjectButton />}
            />
        );
    }

    if (step === 'object') {
        return (
            <ObjectStep
                objectIndication={get(data, 'UrgentAction.object_indication')}
                loading={loading}
            />
        );
    }

    if (step === 'thanks') {
        const subject = sessionData.getMailObject();
        const signature = sessionData.getSignature();

        return (
            <Thanks
                {...get(data, 'UrgentAction.email_thank')}
                actions={() => (
                    <a href={generateUrl('letter', { id, signature, subject })} download>
                        <Email />
                    </a>
                )}
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
