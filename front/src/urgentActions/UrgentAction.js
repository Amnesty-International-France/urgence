import get from 'lodash.get';
import React from 'react';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import Story from './Story';
import Act from './Act';
import Thanks from './Thanks';
import Message from './message/Message';
import ObjectStep from './ObjectStep';
import { routeMatch } from '../propTypes';
import generateUrl from '../services/generateUrl';
import ToUrgentActionPageLink from './ToUrgentActionPageLink';
import SignatureStep from './SignatureStep';
import AddressStep from './AddressStep';
import EmailStep from './EmailStep';
import SendMail from './message/SendMail';
import { SessionDataProvider } from '../SessionDataContext';
import LoadingScreen from '../themes/LoadingScreen';
import MailPdfButton from './MailPdfButton';

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
            end_of_story_link {
                label
                url
            }
            call_to_action {
                title
                message
                button
                link {
                    label
                    url
                }
            }
            object_indication
            message_template {
                value
            }
            message_link {
                label
                url
            }
            recipient {
                mail
                copies_to
                cci
            }
            email_thank {
                title
                text
                link {
                    label
                    url
                }
            }
            letter_thank {
                title
                text
                link {
                    label
                    url
                }
            }
        }
    }
`;

export const UrgentAction = ({ step, id, data, error, loading }) => {
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
        return (
            <Story
                story={get(data, 'UrgentAction.story')}
                endStoryLink={get(data, 'UrgentAction.end_of_story_link')}
            />
        );
    }

    if (step === 'act') {
        return (
            <Act
                callToAction={get(data, 'UrgentAction.call_to_action')}
                action={
                    <ToUrgentActionPageLink
                        label={get(data, 'UrgentAction.call_to_action.button')}
                        pageName="message"
                    />
                }
            />
        );
    }

    if (step === 'message') {
        return (
            <Message
                messageTemplate={get(data, 'UrgentAction.message_template')}
                objectIndication=""
                link={get(data, 'UrgentAction.message_link')}
                loading={loading}
                action={
                    <ToUrgentActionPageLink label="OK, J'envoie le message" pageName="object" />
                }
            />
        );
    }

    if (step === 'object') {
        return (
            <ObjectStep
                objectIndication={get(data, 'UrgentAction.object_indication')}
                loading={loading}
                action={disabled => (
                    <ToUrgentActionPageLink
                        label="Valider"
                        pageName="signature"
                        disabled={disabled}
                    />
                )}
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
        return (
            <Thanks
                {...get(data, 'UrgentAction.email_thank')}
                actions={() => <ToUrgentActionPageLink label="Continuer" pageName="address" />}
            />
        );
    }

    if (step === 'address') {
        return (
            <AddressStep
                action={disabled => (
                    <ToUrgentActionPageLink label="Valider" pageName="email" disabled={disabled} />
                )}
            />
        );
    }

    if (step === 'email') {
        return <EmailStep action={disabled => <MailPdfButton disabled={disabled} />} />;
    }

    if (step === 'thanks-letter') {
        return <Thanks {...get(data, 'UrgentAction.letter_thank')} />;
    }
};

UrgentAction.propTypes = {
    step: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    data: PropTypes.object,
    error: PropTypes.object,
    loading: PropTypes.bool,
};

export const UrgentActionWithData = ({
    match: {
        params: { id, step },
    },
}) => (
    <SessionDataProvider>
        <Query query={query} variables={{ id }}>
            {({ data, error, loading }) => (
                <UrgentAction step={step} id={id} data={data} error={error} loading={loading} />
            )}
        </Query>
    </SessionDataProvider>
);

UrgentActionWithData.propTypes = {
    match: routeMatch,
};

export default withRouter(UrgentActionWithData);
