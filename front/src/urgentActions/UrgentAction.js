import get from 'lodash.get';
import React from 'react';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import Story from './story/Story';
import Act from './Act';
import Thanks from './Thanks';
import Message from './message/Message';
import { routeMatch } from '../propTypes';
import generateUrl from '../services/generateUrl';
import ToUrgentActionPageLink from './ToUrgentActionPageLink';
import AddressStep from './AddressStep';
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
                button
            }
            email_thank {
                title
                text
                button
                share {
                    active
                    message
                }
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

const ANALYTICS_CATEGORIES = {
    ACT: 'AskForEmail',
    MESSAGE: 'Email',
    THANKS_EMAIL: 'AskForLetter',
    ADDRESS: 'LetterManually',
};

const isLetterStepPresent = recipient => {
    return recipient.button && recipient.postal_address;
};

export const UrgentAction = ({ step, id, data, error, loading }) => {
    const recipient = get(data, 'UrgentAction.recipient');

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
        const callToAction = get(data, 'UrgentAction.call_to_action');
        return (
            <Act
                data={callToAction}
                actions={() =>
                    callToAction && callToAction.button ? (
                        <ToUrgentActionPageLink
                            label={callToAction.button}
                            step={step}
                            pageName="message"
                            analyticsCategory={ANALYTICS_CATEGORIES.ACT}
                            buttonName="ShowMail"
                        />
                    ) : null
                }
            />
        );
    }

    if (step === 'message') {
        return (
            <Message
                messageTemplate={get(data, 'UrgentAction.message_template')}
                objectIndication={get(data, 'UrgentAction.object_indication')}
                link={get(data, 'UrgentAction.message_link')}
                loading={loading}
                step={step}
                analyticsCategory={ANALYTICS_CATEGORIES.MESSAGE}
                action={
                    <SendMail
                        step={step}
                        recipient={recipient}
                        messageTemplate={get(data, 'UrgentAction.message_template')}
                        analyticsCategory={ANALYTICS_CATEGORIES.MESSAGE}
                    />
                }
            />
        );
    }

    if (step === 'thanks') {
        const emailThank = get(data, 'UrgentAction.email_thank');
        return (
            <Thanks
                data={emailThank}
                actions={() =>
                    emailThank && emailThank.button && isLetterStepPresent(recipient) ? (
                        <ToUrgentActionPageLink
                            label={emailThank.button}
                            step={step}
                            pageName="address"
                            analyticsCategory={ANALYTICS_CATEGORIES.THANKS}
                            buttonName="ActionLetter"
                        />
                    ) : null
                }
            />
        );
    }

    if (step === 'address') {
        return (
            <AddressStep
                step={step}
                analyticsCategory={ANALYTICS_CATEGORIES.ADDRESS}
                action={disabled => (
                    <MailPdfButton
                        step={step}
                        disabled={disabled}
                        buttonText={recipient.button}
                        analyticsCategory={ANALYTICS_CATEGORIES.ADDRESS}
                    />
                )}
            />
        );
    }

    if (step === 'thanks-end') {
        const thankEnd = get(data, 'UrgentAction.letter_thank');
        return <Thanks data={thankEnd} />;
    }
};

UrgentAction.propTypes = {
    id: PropTypes.string.isRequired,
    step: PropTypes.string,
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
