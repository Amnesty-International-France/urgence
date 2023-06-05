import { Query } from '@apollo/client/react/components';
import styled from '@emotion/styled';
import gql from 'graphql-tag';
import get from 'lodash.get';
import { Fragment } from 'react';
import { Navigate, useNavigate } from 'react-router';

import { useParams } from 'react-router';
import { DataProvider } from '../DataContext';
import SEO from '../SEO';
import generateUrl from '../services/generateUrl';
import LoadingScreen from '../themes/LoadingScreen';
import Stepper from '../themes/Stepper';
import MessageSend from './messageSend/MessageSend';
import SendMail from './messageSend/SendMail';
import MessageView from './messageView/MessageView';
import ToMessageSendButton from './messageView/ToMessageSendButton';
import Register from './register/Register';
import RegisterButton from './register/RegisterButton';
import ShareStep from './share/ShareStep';
import Story from './story/Story';
import ThankStep, { ThanksType } from './ThankStep';

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
    const story = get(data, 'UrgentAction.story');

    const navigate = useNavigate();
    if (!story || !story.length) {
        return <Navigate to={generateUrl('home')} />;
    }

    if (!step) {
        return <Navigate to={generateUrl('story', { slug })} />;
    }

    if (step === 'story' || step === 'act') {
        const callToAction = get(data, 'UrgentAction.call_to_action');
        const responseCount = get(data, 'UrgentAction.response_count');
        const id = get(data, 'UrgentAction.id');
        return (
            <Story // @ts-ignore
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
            <MessageView // @ts-ignore
                text={text}
                objectIndication={objectIndication}
                objectExample={objectExample}
                messageTemplate={messageTemplate}
                step={step}
                action={
                    <ToMessageSendButton
                        label={buttonView}
                        step={step}
                        pageName="message-send"
                        objectExample={objectExample}
                        buttonName="OpenMessageSend"
                    />
                }
            />
        );
    }

    if (step === 'message-send') {
        const id = get(data, 'UrgentAction.id');
        const text = get(data, 'UrgentAction.message.text_send') as string;
        const messageTemplate = get(data, 'UrgentAction.message.message_template');
        const recipient = get(data, 'UrgentAction.message.recipient');
        const buttonSend = get(data, 'UrgentAction.message.button_send', "J'envoie");
        const gdprMessage = get(data, 'GdprMessage.content');

        return (
            <MessageSend // @ts-ignore
                text={text}
                messageTemplate={messageTemplate}
                gdprMessage={gdprMessage}
                step={step}
                action={
                    <SendMail // @ts-ignore
                        label={buttonSend}
                        step={step}
                        recipient={recipient}
                        messageTemplate={messageTemplate}
                        auId={id}
                        afterMail={({ failed, registered }: any) => {
                            if (failed) {
                                global.console.log('Failed to open mailto link')
                            }
                            navigate(generateUrl(registered ? 'share' : 'register', { slug }));
                        }}
                    />
                }
            />
        );
    }

    if (step === 'share') {
        const emailThank = get(data, 'UrgentAction.email_thank');

        return (
            <ShareStep // @ts-ignore
                slug={slug}
                step={step}
                data={emailThank}
            />
        );
    }

    if (step === 'register') {
        const register = get(data, 'UrgentAction.register');

        return (
            <Register // @ts-ignore
                step={step}
                data={register}
                gdprRegister={get(data, 'GdprRegister.content')}
                action={(disabled: any, formValues: any) => (
                    <RegisterButton
                        auId={get(data, 'UrgentAction.id')}
                        step={step}
                        disabled={disabled}
                        buttonText={get(register, 'button')}
                        formValues={formValues}
                    />
                )}
            />
        );
    }

    if (step === 'thanks-end') {
        const thankEnd = get(data, 'UrgentAction.end_thank') as ThanksType | undefined;
        const emailThank = get(data, 'UrgentAction.email_thank');

        return (
            <ThankStep // @ts-ignore
                data={thankEnd}
                slug={slug}
                step={step}
                dataShare={emailThank}
            />
        );
    }

    return null;
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
                return <Navigate to={generateUrl('error')} />;
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
                    <UrgentAction slug={slug} step={step} data={data} />
                </Fragment>
            );
        };

export const UrgentActionWithData = () => {
    const { slug, step, page } = useParams();
    return (
        <DataProvider>
            <Query query={query} variables={{ slug }}>
                {renderUrgentActionWithData(slug, step, page)}
            </Query>
        </DataProvider>
    );
};

export default UrgentActionWithData;
