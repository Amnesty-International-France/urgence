import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import get from 'lodash.get';

import { DataProvider } from '../DataContext';
import SEO from '../SEO';
import Story from './story/Story';
import Act from './Act';
import ThankStep from './ThankStep';
import Share from './share/Share';
import ANALYTICS_CATEGORIES from '../analytics/categories';
import Message from './message/Message';
import { routeMatch } from '../propTypes';
import generateUrl from '../services/generateUrl';
import ToUrgentActionPageLink from './ToUrgentActionPageLink';
import SendMail from './message/SendMail';
import LoadingScreen from '../themes/LoadingScreen';
import RegisterButton from './register/RegisterButton';
import Register from './register/Register';

import Steps from '../themes/Steps';

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
                title
                text
                button
            }
            end_thank {
                title
                text
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
        const messageTemplate = get(data, 'UrgentAction.message_template');
        const objectIndication = get(data, 'UrgentAction.object_indication');
        const gdprMessage = get(data, 'GdprMessage.content');
        const id = get(data, 'UrgentAction.id');
        return (
            <Message
                messageTemplate={messageTemplate}
                objectIndication={objectIndication}
                gdprMessage={gdprMessage}
                step={step}
                analyticsCategory={ANALYTICS_CATEGORIES.MESSAGE}
                action={
                    <SendMail
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
            <Share
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
    history: PropTypes.object.isRequired,
    slug: PropTypes.string.isRequired,
    step: PropTypes.string,
    data: PropTypes.object,
};

// eslint-disable-next-line react/prop-types
export const renderUrgentActionWithData = (history, slug, step, page) => ({
    data,
    error,
    loading,
}) => {
    if (error) {
        console.error(error);
        return <Redirect to={generateUrl('error')} />;
    }

    if (loading) {
        return <LoadingScreen />;
    }

    const seoProps = seoPropsFromStory(get(data, 'UrgentAction.story'));

    return (
        <Fragment>
            {seoProps && <SEO title={get(data, 'UrgentAction.title')} {...seoProps} />}
            <UrgentAction history={history} slug={slug} step={step} data={data} />
            <Steps data={data} step={step} page={page} />
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
