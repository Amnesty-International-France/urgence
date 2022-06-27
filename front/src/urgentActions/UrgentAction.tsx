import { Query } from '@apollo/client/react/components';
import styled from '@emotion/styled';
import gql from 'graphql-tag';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import get from 'lodash.get';
import { Fragment } from 'react';
import { Navigate, useNavigate } from 'react-router';

import { useParams } from 'react-router';
import ANALYTICS_CATEGORIES from '../analytics/categories';
// @ts-expect-error TS(6142): Module '../DataContext' was resolved to '/home/gui... Remove this comment to see the full error message
import { DataProvider } from '../DataContext';
// @ts-expect-error TS(6142): Module '../SEO' was resolved to '/home/guillaume/d... Remove this comment to see the full error message
import SEO from '../SEO';
import generateUrl from '../services/generateUrl';
// @ts-expect-error TS(6142): Module '../themes/LoadingScreen' was resolved to '... Remove this comment to see the full error message
import LoadingScreen from '../themes/LoadingScreen';
// @ts-expect-error TS(6142): Module '../themes/Stepper' was resolved to '/home/... Remove this comment to see the full error message
import Stepper from '../themes/Stepper';
// @ts-expect-error TS(6142): Module './messageSend/MessageSend' was resolved to... Remove this comment to see the full error message
import MessageSend from './messageSend/MessageSend';
// @ts-expect-error TS(6142): Module './messageSend/SendMail' was resolved to '/... Remove this comment to see the full error message
import SendMail from './messageSend/SendMail';
// @ts-expect-error TS(6142): Module './messageView/MessageView' was resolved to... Remove this comment to see the full error message
import MessageView from './messageView/MessageView';
// @ts-expect-error TS(6142): Module './messageView/ToMessageSendButton' was res... Remove this comment to see the full error message
import ToMessageSendButton from './messageView/ToMessageSendButton';
// @ts-expect-error TS(6142): Module './register/Register' was resolved to '/hom... Remove this comment to see the full error message
import Register from './register/Register';
// @ts-expect-error TS(6142): Module './register/RegisterButton' was resolved to... Remove this comment to see the full error message
import RegisterButton from './register/RegisterButton';
// @ts-expect-error TS(6142): Module './share/ShareStep' was resolved to '/home/... Remove this comment to see the full error message
import ShareStep from './share/ShareStep';
// @ts-expect-error TS(6142): Module './story/Story' was resolved to '/home/guil... Remove this comment to see the full error message
import Story from './story/Story';
// @ts-expect-error TS(6142): Module './ThankStep' was resolved to '/home/guilla... Remove this comment to see the full error message
import ThankStep from './ThankStep';

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
                    crop {
                        x
                        y
                        width
                        height
                    }
                }
                mediumDesktop {
                    src
                    title
                    crop {
                        x
                        y
                        width
                        height
                    }
                }
                content
            }
            call_to_action {
                title
                message
                button
                progress {
                    display
                    objective
                    display_threshold
                    message
                }
                interpelation_mode
                twitter_action {
                    title
                    message
                    hashtags
                    url
                }
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
                telegram {
                    url
                    message
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
            response_count
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

type UrgentActionProps = {
    slug: string;
    step?: string;
    data?: any;
};

export const UrgentAction = ({ slug, step, data }: UrgentActionProps) => {
    console.log('UrgentAction', slug, step, data);
    const story = get(data, 'UrgentAction.story');

    const navigate = useNavigate();
    if (!story || !story.length) {
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <Navigate to={generateUrl('home')} />;
    }

    if (!step) {
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <Navigate to={generateUrl('story', { slug })} />;
    }

    if (step === 'story' || step === 'act') {
        const callToAction = get(data, 'UrgentAction.call_to_action');
        const responseCount = get(data, 'UrgentAction.response_count');
        const id = get(data, 'UrgentAction.id');
        return (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Story
                story={story}
                step={step}
                callToAction={callToAction}
                responseCount={responseCount}
                auId={id}
            />
        );
    }

    if (step === 'message-view') {
        const text = get(data, 'UrgentAction.message.text_view');
        const objectIndication = get(data, 'UrgentAction.message.object_indication');
        const objectExample = get(data, 'UrgentAction.message.object_example');
        const messageTemplate = get(data, 'UrgentAction.message.message_template');
        const buttonView = get(data, 'UrgentAction.message.button_view', 'Suivant');

        return (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <MessageView
                text={text}
                objectIndication={objectIndication}
                objectExample={objectExample}
                messageTemplate={messageTemplate}
                step={step}
                analyticsCategory={ANALYTICS_CATEGORIES.MESSAGE}
                action={
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <MessageSend
                text={text}
                messageTemplate={messageTemplate}
                gdprMessage={gdprMessage}
                step={step}
                analyticsCategory={ANALYTICS_CATEGORIES.MESSAGE}
                action={
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <SendMail
                        label={buttonSend}
                        step={step}
                        recipient={recipient}
                        messageTemplate={messageTemplate}
                        analyticsCategory={ANALYTICS_CATEGORIES.MESSAGE}
                        auId={id}
                        afterMail={({ registered }: any) =>
                            (navigate as any).push(
                                generateUrl(registered ? 'share' : 'register', { slug }),
                            )
                        }
                    />
                }
            />
        );
    }

    if (step === 'share') {
        const emailThank = get(data, 'UrgentAction.email_thank');

        return (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Register
                step={step}
                data={register}
                gdprRegister={get(data, 'GdprRegister.content')}
                analyticsCategory={ANALYTICS_CATEGORIES.REGISTER}
                action={(disabled: any, formValues: any) => (
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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

const StepperContainer = styled('div')({
    position: 'absolute',
    top: '20px',
    left: '0px',
    right: '0px',
});

export const renderUrgentActionWithData =
    (slug: any, step: any, page: any) =>
    ({
        /* eslint-disable react/prop-types */
        data,

        error,

        loading,
    }: /* eslint-enable react/prop-types */
    any) => {
        if (error) {
            console.error(error);
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <Navigate to={generateUrl('error')} />;
        }

        if (loading) {
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <LoadingScreen />;
        }

        const socialMetadata = get(data, 'UrgentAction.social_metadata');

        return (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Fragment>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <StepperContainer>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Stepper data={data} step={step} page={page} />
                </StepperContainer>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                {socialMetadata && <SEO socialMetadata={socialMetadata} />}
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <UrgentAction slug={slug} step={step} data={data} />
            </Fragment>
        );
    };

export const UrgentActionWithData = () => {
    const { slug, step, page } = useParams();
    return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <DataProvider>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Query query={query} variables={{ slug }}>
                {renderUrgentActionWithData(slug, step, page)}
            </Query>
        </DataProvider>
    );
};

export default UrgentActionWithData;
