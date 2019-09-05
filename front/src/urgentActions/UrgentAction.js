import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import get from 'lodash.get';

import SEO from '../SEO';
import Story from './story/Story';
import Act from './Act';
import ThankStep from './ThankStep';
import ShareStep from './ShareStep';
import ANALYTICS_CATEGORIES from '../analytics/categories';
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

const seoPropsFromStory = story => {
    if (!story || story.length === 0) {
        return null;
    }
    const storyCover = story[0];
    const description = storyCover.content;
    const image = get(storyCover, 'medium.src');
    const alt = get(storyCover, 'medium.title');

    const extraMeta = image
        ? [
              {
                  property: 'og:image',
                  content: image,
              },
              {
                  property: 'og:image:alt',
                  content: alt,
              },
              {
                  property: 'twitter:image',
                  content: image,
              },
              {
                  property: 'twitter:image:alt',
                  content: alt,
              },
          ]
        : [];

    return {
        description,
        extraMeta,
    };
};

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
            object_indication
            message_template {
                value
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
            }
            register {
                text
                button
            }
            end_thank {
                title
                text
            }
        }
    }
`;

const isLetterStepPresent = recipient => {
    return recipient.button && recipient.postal_address;
};

export const UrgentAction = ({ slug, data, step, error, loading }) => {
    if (error) {
        console.error(error);
        return <Redirect to={generateUrl('error')} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    const recipient = get(data, 'UrgentAction.recipient');
    const story = get(data, 'UrgentAction.story');

    if (!story || !story.length) {
        return <Redirect to={generateUrl('home')} />;
    }

    if (!step) {
        return <Redirect to={generateUrl('story', { slug })} />;
    }

    if (step === 'story') {
        return <Story story={story} />;
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
                loading={loading}
                step={step}
                analyticsCategory={ANALYTICS_CATEGORIES.MESSAGE}
                action={
                    <SendMail
                        step={step}
                        recipient={recipient}
                        messageTemplate={get(data, 'UrgentAction.message_template')}
                        analyticsCategory={ANALYTICS_CATEGORIES.MESSAGE}
                        urgentActionId={get(data, 'UrgentAction.id')}
                    />
                }
            />
        );
    }

    if (step === 'thanks') {
        const emailThank = get(data, 'UrgentAction.email_thank');

        if (emailThank.share) {
            return (
                <ShareStep
                    slug={slug}
                    step={step}
                    data={emailThank}
                    analyticsCategory={ANALYTICS_CATEGORIES.SHARE}
                />
            );
        }
        return (
            <ThankStep
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
                        auId={get(data, 'UrgentAction.id')}
                        disabled={disabled}
                        buttonText={recipient.button}
                        analyticsCategory={ANALYTICS_CATEGORIES.ADDRESS}
                    />
                )}
            />
        );
    }

    if (step === 'register') {
        const register = get(data, 'UrgentAction.register');

        return (
            <RegisterActivist
                data={register}
                step={step}
                analyticsCategory={ANALYTICS_CATEGORIES.REGISTER}
                action={disabled => (
                    <RegisterButton
                        auId={get(data, 'UrgentAction.id')}
                        step={step}
                        disabled={disabled}
                        buttonText={get(register, 'button')}
                        analyticsCategory={ANALYTICS_CATEGORIES.REGISTER}
                    />
                )}
            />
        );
    }

    if (step === 'thanks-end') {
        const thankEnd = get(data, 'UrgentAction.end_thank');
        return <ThankStep data={thankEnd} />;
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
            {({ data, error, loading }) => {
                const seoProps = seoPropsFromStory(get(data, 'UrgentAction.story'));
                return (
                    <Fragment>
                        {seoProps && <SEO title={get(data, 'UrgentAction.title')} {...seoProps} />}
                        <UrgentAction
                            slug={slug}
                            step={step}
                            data={data}
                            error={error}
                            loading={loading}
                        />
                    </Fragment>
                );
            }}
        </Query>
    </DataProvider>
);

UrgentActionWithData.propTypes = {
    match: routeMatch,
};

export default withRouter(UrgentActionWithData);
