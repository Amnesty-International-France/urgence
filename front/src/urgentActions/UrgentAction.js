import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import glamorous from 'glamorous';

import { routeMatch } from '../propTypes';
import { DataProvider } from '../DataContext';
import LoadingScreen from '../themes/LoadingScreen';
import Stepper from '../themes/Stepper';
import SEO from '../SEO';
import Story from './story/Story';
import ThankStep from './ThankStep';
import ShareStep from './share/ShareStep';
import ANALYTICS_CATEGORIES from '../analytics/categories';
import MessageView from './messageView/MessageView';
import ToMessageSendButton from './messageView/ToMessageSendButton';
import MessageSend from './messageSend/MessageSend';
import SendMail from './messageSend/SendMail';
import generateUrl from '../services/generateUrl';
import RegisterButton from './register/RegisterButton';
import Register from './register/Register';

const query = gql`
    query urgentActionBySlug($slug: String!) {
        UrgentAction: UrgentActionBySlug(slug: $slug) {
            id
            title
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
            call_to_action {
                title
                message
                button
            }
            message {
                text_view
                text_send
                button_view
                button_send
                object_indication
                object_example
                message_template {
                    value
                }
                recipient {
                    mail
                    copies_to
                    cci
                    button
                }
            }
            email_thank {
                title
                text
                button
                share {
                    message
                    twitter_message
                }
            }
            register {
                title
                text
                phone_indication
                button
            }
            end_thank {
                title
                text
            }
            social_metadata {
                title
                description
                medium {
                    src
                    title
                }
            }
        }
        GdprMessage: SettingByType(type: "gdpr-message") {
            id
            type
            content
        }
        GdprRegister: SettingByType(type: "gdpr-register") {
            id
            type
            content
        }
    }
`;

export const UrgentAction = ({ history, slug, step, data }) => {
    const story = get(data, 'UrgentAction.story');

    if (!story || !story.length) {
        return <Redirect to={generateUrl('home')} />;
    }

    if (!step) {
        return <Redirect to={generateUrl('story', { slug })} />;
    }

    if (step === 'story' || step === 'act') {
        const callToAction = get(data, 'UrgentAction.call_to_action');
        return <Story story={story} step={step} callToAction={callToAction} />;
    }

    if (step === 'message-view') {
        const text = get(data, 'UrgentAction.message.text_view');
        const objectIndication = get(data, 'UrgentAction.message.object_indication');
        const objectExample = get(data, 'UrgentAction.message.object_example');
        const messageTemplate = get(data, 'UrgentAction.message.message_template');
        const buttonView = get(data, 'UrgentAction.message.button_view', 'Suivant');

        return (
            <MessageView
                text={text}
                objectIndication={objectIndication}
                objectExample={objectExample}
                messageTemplate={messageTemplate}
                step={step}
                analyticsCategory={ANALYTICS_CATEGORIES.MESSAGE}
                action={
                    <ToMessageSendButton
                        label={buttonView}
                        step={step}
                        pageName="message-send"
                        analyticsCategory={ANALYTICS_CATEGORIES.MESSAGE}
                        objectExample={objectExample}
                        buttonName="OpenMessageSend"
                    />
                }
            />
        );
    }

    if (step === 'message-send') {
        const id = get(data, 'UrgentAction.id');
        const text = get(data, 'UrgentAction.message.text_send');
        const messageTemplate = get(data, 'UrgentAction.message.message_template');
        const recipient = get(data, 'UrgentAction.message.recipient');
        const buttonSend = get(data, 'UrgentAction.message.button_send', "J'envoie");
        const gdprMessage = get(data, 'GdprMessage.content');

        return (
            <MessageSend
                text={text}
                messageTemplate={messageTemplate}
                gdprMessage={gdprMessage}
                step={step}
                analyticsCategory={ANALYTICS_CATEGORIES.MESSAGE}
                action={
                    <SendMail
                        label={buttonSend}
                        step={step}
                        recipient={recipient}
                        messageTemplate={messageTemplate}
                        analyticsCategory={ANALYTICS_CATEGORIES.MESSAGE}
                        auId={id}
                        afterMail={({ registered }) =>
                            history.push(generateUrl(registered ? 'share' : 'register', { slug }))
                        }
                    />
                }
            />
        );
    }

    if (step === 'share') {
        const emailThank = get(data, 'UrgentAction.email_thank');

        return (
            <ShareStep
                slug={slug}
                step={step}
                data={emailThank}
                analyticsCategory={ANALYTICS_CATEGORIES.SHARE}
            />
        );
    }

    if (step === 'register') {
        const register = get(data, 'UrgentAction.register');

        return (
            <Register
                step={step}
                data={register}
                gdprRegister={get(data, 'GdprRegister.content')}
                analyticsCategory={ANALYTICS_CATEGORIES.REGISTER}
                action={(disabled, formValues) => (
                    <RegisterButton
                        auId={get(data, 'UrgentAction.id')}
                        step={step}
                        disabled={disabled}
                        buttonText={get(register, 'button')}
                        analyticsCategory={ANALYTICS_CATEGORIES.REGISTER}
                        formValues={formValues}
                    />
                )}
            />
        );
    }

    if (step === 'thanks-end') {
        const thankEnd = get(data, 'UrgentAction.end_thank');
        const emailThank = get(data, 'UrgentAction.email_thank');

        return (
            <ThankStep
                data={thankEnd}
                slug={slug}
                step={step}
                dataShare={emailThank}
                analyticsCategory={ANALYTICS_CATEGORIES.SHARE}
            />
        );
    }
};

UrgentAction.propTypes = {
    history: PropTypes.object.isRequired,
    slug: PropTypes.string.isRequired,
    step: PropTypes.string,
    data: PropTypes.object,
};

const StepperContainer = glamorous.div({
    position: 'absolute',
    top: '20px',
    left: '0px',
    right: '0px',
});

export const renderUrgentActionWithData = (history, slug, step, page) => ({
    /* eslint-disable react/prop-types */
    data,
    error,
    loading,
    /* eslint-enable react/prop-types */
}) => {
    if (error) {
        console.error(error);
        return <Redirect to={generateUrl('error')} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    const socialMetadata = get(data, 'UrgentAction.social_metadata');

    return (
        <Fragment>
            <StepperContainer>
                <Stepper data={data} step={step} page={page} />
            </StepperContainer>
            {socialMetadata && <SEO socialMetadata={socialMetadata} />}
            <UrgentAction history={history} slug={slug} step={step} data={data} />
        </Fragment>
    );
};

export const UrgentActionWithData = ({
    history,
    match: {
        params: { slug, step, page },
    },
}) => (
    <DataProvider>
        <Query query={query} variables={{ slug }}>
            {renderUrgentActionWithData(history, slug, step, page)}
        </Query>
    </DataProvider>
);

UrgentActionWithData.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    match: routeMatch,
};

export default withRouter(UrgentActionWithData);
