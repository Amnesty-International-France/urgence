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
import ToSignatureButton from './ToSignatureButton';
import SignatureStep from './SignatureStep';
import SendMail from './message/SendMail';
import { SessionDataProvider } from '../SessionDataContext';
import LoadingScreen from '../themes/LoadingScreen';

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

    if (loading) {
        return <LoadingScreen />;
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
                action={disabled => <ToSignatureButton disabled={disabled} />}
            />
        );
    }

    if (step === 'signature') {
        return (
            <SignatureStep
                action={
                    <SendMail
                        recipient={get(data, 'UrgentAction.recipient')}
                        messageTemplate={get(data, 'UrgentAction.message_template')}
                    />
                }
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
    <SessionDataProvider>
        <Query query={query} variables={{ id }}>
            {renderUrgentAction({ step, page, id })}
        </Query>
    </SessionDataProvider>
);

UrgentAction.propTypes = {
    match: routeMatch,
};

export default withRouter(UrgentAction);
