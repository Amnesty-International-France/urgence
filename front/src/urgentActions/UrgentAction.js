import React from 'react';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import get from 'lodash.get';

import Story from './story/Story';
import Act from './Act';
import Thanks from './Thanks';
import Message from './message/Message';
import { routeMatch } from '../propTypes';
import generateUrl from '../services/generateUrl';
import ToUrgentActionPageLink from './ToUrgentActionPageLink';
import AddressStep from './AddressStep';
import SendMail from './message/SendMail';
import { DataProvider } from '../DataContext';
import LoadingScreen from '../themes/LoadingScreen';
import MailPdfButton from './MailPdfButton';
import RegisterButton from './register/RegisterButton';
import RegisterActivist from './register/RegisterActivist';

const query = gql`
    query UrgentActionBySlug($slug: String!) {
        UrgentAction(id: $id) {
            id
            slug
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
                    message
                    active_twitter
                    twitter_message
                    twitter_title
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
    REGISTER: 'RegisterActivist',
};

const isLetterStepPresent = recipient => {
    return recipient.button && recipient.postal_address;
};

export const UrgentAction = ({ slug, data, step, error, loading }) => {
    const recipient = get(data, 'UrgentAction.recipient');

    if (error) {
        console.error(error);
        return null;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    if (!step) {
        return <Redirect to={generateUrl('story', { slug })} />;
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
        const auId = get(data, 'UrgentAction.id');
        return (
            <Thanks
                data={emailThank}
                auId={auId}
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

    if (step === 'register') {
        return (
            <RegisterActivist
                step={step}
                analyticsCategory={ANALYTICS_CATEGORIES.REGISTER}
                action={disabled => (
                    <RegisterButton
                        step={step}
                        disabled={disabled}
                        buttonText="Je m'inscris"
                        analyticsCategory={ANALYTICS_CATEGORIES.REGISTER}
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
    slug: PropTypes.string.isRequired,
    step: PropTypes.string,
    data: PropTypes.object,
    error: PropTypes.object,
    loading: PropTypes.bool,
};

export const UrgentActionWithData = ({
    match: {
        params: { slug, step },
    },
}) => (
    <DataProvider>
        <Query query={query} variables={{ slug }}>
            {({ data, error, loading }) => (
                <UrgentAction slug={slug} step={step} data={data} error={error} loading={loading} />
            )}
        </Query>
    </DataProvider>
);

UrgentActionWithData.propTypes = {
    match: routeMatch,
};

export default withRouter(UrgentActionWithData);
