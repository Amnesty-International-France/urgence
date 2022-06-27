import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
// @ts-expect-error TS(2305): Module '"react-router-dom"' has no exported member... Remove this comment to see the full error message
import { Redirect } from 'react-router-dom';

// @ts-expect-error TS(6142): Module './UrgentAction' was resolved to '/home/gui... Remove this comment to see the full error message
import { renderUrgentActionWithData, UrgentAction } from './UrgentAction';
// @ts-expect-error TS(6142): Module './story/Story' was resolved to '/home/guil... Remove this comment to see the full error message
import Story from './story/Story';
// @ts-expect-error TS(6142): Module './messageView/MessageView' was resolved to... Remove this comment to see the full error message
import MessageView from './messageView/MessageView';
// @ts-expect-error TS(6142): Module './messageSend/MessageSend' was resolved to... Remove this comment to see the full error message
import MessageSend from './messageSend/MessageSend';
// @ts-expect-error TS(6142): Module './share/ShareStep' was resolved to '/home/... Remove this comment to see the full error message
import ShareStep from './share/ShareStep';
// @ts-expect-error TS(6142): Module './register/Register' was resolved to '/hom... Remove this comment to see the full error message
import Register from './register/Register';
// @ts-expect-error TS(6142): Module './ThankStep' was resolved to '/home/guilla... Remove this comment to see the full error message
import ThankStep from './ThankStep';

// @ts-expect-error TS(6142): Module '../themes/LoadingScreen' was resolved to '... Remove this comment to see the full error message
import LoadingScreen from '../themes/LoadingScreen';

jest.mock('../data');
jest.mock('react-router-dom');

const defaultStep = {
    id: '',
    content: '',
    displayOptions: {
        mediumPosition: 'top',
        backgroundColor: 'red',
    },
};

describe('<UrgentActionWithData />', () => {
    const defaultProps = {
        id: '3b6e1a3e-2547-4d77-a310-1b39d15fa03a',
        page: '1',
        loading: false,
        data: {
            UrgentAction: {},
        },
    };

    it('should display the LoadingScreen when GraphQL is loading', () => {
        const props = {
            ...defaultProps,
            loading: true,
            error: false,
        };

        // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
        const UrgentActionWithData = renderUrgentActionWithData('on-the-way', 'story');
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = shallow(<UrgentActionWithData {...props} />);

        const loading = wrapper.find(LoadingScreen);
        expect(loading.length).toEqual(1);
    });

    it('should Redirect to the error page if there is a GraphQL error', () => {
        const props = {
            ...defaultProps,
            error: new Error('An error occured'),
        };

        // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
        const UrgentActionWithData = renderUrgentActionWithData('on-the-way', 'story');
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = shallow(<UrgentActionWithData {...props} />);

        const redirect = wrapper.find(Redirect);
        expect(redirect.length).toEqual(1);
        expect(redirect.prop('to')).toEqual('/error');
    });
});

describe('<UrgentAction />', () => {
    const defaultProps = {
        id: '3b6e1a3e-2547-4d77-a310-1b39d15fa03a',
        history: {
            push: jest.fn(),
        },
        slug: 'on-the-way',
        step: 'story',
        page: '1',
        loading: false,
        data: {
            UrgentAction: {},
        },
    };

    describe('Story Step', () => {
        it('should display the "story"', () => {
            const props = {
                ...defaultProps,
                loading: false,
                data: {
                    UrgentAction: {
                        story: [
                            {
                                ...defaultStep,
                                id: '3b6e1a3e-2547-4d77-a310-1b39d15fa03a',
                            },
                        ],
                    },
                },
            };
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            const wrapper = shallow(<UrgentAction {...props} />);
            const story = wrapper.find(Story);

            expect(story.prop('story')).toEqual([
                {
                    ...defaultStep,
                    id: '3b6e1a3e-2547-4d77-a310-1b39d15fa03a',
                },
            ]);
        });

        it('should display the "act"', () => {
            const props = {
                step: 'act',
                loading: false,
                data: {
                    UrgentAction: {
                        story: [
                            {
                                ...defaultStep,
                            },
                        ],
                        call_to_action: {
                            title: 'Call To Action',
                            message: 'My Message',
                        },
                    },
                },
            };
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            const renderedComponent = shallow(<UrgentAction {...props} />);
            expect(renderedComponent.find(Story).length).toBe(1);

            const data = renderedComponent.prop('callToAction');
            expect(data.title).toBe('Call To Action');
            expect(data.message).toBe('My Message');
        });
    });

    describe('Message View Step', () => {
        it('should display the "message view"', () => {
            const props = {
                ...defaultProps,
                step: 'message-view',
                data: {
                    ...defaultProps.data,
                    UrgentAction: {
                        story: [
                            {
                                ...defaultStep,
                            },
                        ],
                        message: {
                            text_view: 'text view',
                            button_view: 'button view',
                            object_indication: 'object indication',
                            object_example: 'object example',
                            message_template: [
                                { value: 'first message' },
                                { value: 'second message' },
                            ],
                        },
                    },
                },
            };

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            const renderedComponent = shallow(<UrgentAction {...props} />);

            const message = renderedComponent.find(MessageView);
            expect(message.length).toBe(1);

            expect(message.prop('objectIndication')).toBe('object indication');
            expect(message.prop('objectExample')).toBe('object example');
            expect(message.prop('text')).toBe('text view');
            expect(message.prop('messageTemplate').length).toBe(2);
            expect(message.prop('messageTemplate')[0].value).toBe('first message');
            expect(message.prop('messageTemplate')[1].value).toBe('second message');
        });

        it('should display the "next" button', () => {
            const props = {
                ...defaultProps,
                step: 'message-view',
                data: {
                    ...defaultProps.data,
                    UrgentAction: {
                        story: [
                            {
                                ...defaultStep,
                            },
                        ],
                        message: {
                            text_view: 'text view',
                            button_view: 'button view',
                            message_template: [
                                { value: 'first message' },
                                { value: 'second message' },
                            ],
                        },
                    },
                },
            };

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            const renderedComponent = shallow(<UrgentAction {...props} />);

            const message = renderedComponent.find(MessageView);
            expect(message.length).toBe(1);

            const sendMail = message.prop('action');
            expect(sendMail.props.label).toBe('button view');
        });
    });

    describe('Message Send Step', () => {
        it('should display the "message send"', () => {
            const props = {
                ...defaultProps,
                step: 'message-send',
                data: {
                    ...defaultProps.data,
                    UrgentAction: {
                        story: [
                            {
                                ...defaultStep,
                            },
                        ],
                        message: {
                            text_send: 'text send',
                            button_send: 'button send',
                            message_template: [
                                { value: 'first message' },
                                { value: 'second message' },
                            ],
                            recipient: {
                                mail: 'mail',
                            },
                        },
                    },
                },
            };

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            const renderedComponent = shallow(<UrgentAction {...props} />);

            const message = renderedComponent.find(MessageSend);
            expect(message.length).toBe(1);

            expect(message.prop('text')).toBe('text send');
        });

        it('should display the "sendMail" button', () => {
            const props = {
                ...defaultProps,
                step: 'message-send',
                data: {
                    ...defaultProps.data,
                    UrgentAction: {
                        story: [
                            {
                                ...defaultStep,
                            },
                        ],
                        message: {
                            text_send: 'text send',
                            button_send: 'button send',
                            message_template: [
                                { value: 'first message' },
                                { value: 'second message' },
                            ],
                            recipient: {
                                mail: 'mail',
                            },
                        },
                    },
                },
            };

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            const renderedComponent = shallow(<UrgentAction {...props} />);

            const message = renderedComponent.find(MessageSend);
            expect(message.length).toBe(1);

            const sendMail = message.prop('action');
            expect(sendMail.props.label).toBe('button send');
            expect(sendMail.props.recipient).toEqual({ mail: 'mail' });
        });

        it('should display the "gdprMessage"', () => {
            const props = {
                ...defaultProps,
                loading: false,
                step: 'message-send',
                data: {
                    UrgentAction: {
                        story: [
                            {
                                ...defaultStep,
                            },
                        ],
                        message: {
                            text_send: 'text send',
                            button_send: 'button send',
                            message_template: [
                                { value: 'first message' },
                                { value: 'second message' },
                            ],
                            recipient: {
                                mail: 'mail',
                            },
                        },
                    },
                    GdprMessage: {
                        id: '1',
                        type: 'gdpr-message',
                        content: 'Gdpr Stuff',
                    },
                },
            };

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            const renderedComponent = shallow(<UrgentAction {...props} />);

            const message = renderedComponent.find(MessageSend);
            expect(message.length).toBe(1);

            const gdpr = message.prop('gdprMessage');
            expect(gdpr).toBe('Gdpr Stuff');
        });
    });

    describe('Register Step', () => {
        it('should display the "title" and the "text"', () => {
            const props = {
                ...defaultProps,
                loading: false,
                step: 'register',
                data: {
                    UrgentAction: {
                        story: [
                            {
                                ...defaultStep,
                            },
                        ],
                        register: {
                            title: 'Subscribe to Urgent Action Network!',
                            text: 'My Message',
                        },
                    },
                },
            };

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            const renderedComponent = shallow(<UrgentAction {...props} />);

            const register = renderedComponent.find(Register);
            expect(register.length).toBe(1);

            const data = register.prop('data');
            expect(data.title).toBe('Subscribe to Urgent Action Network!');
            expect(data.text).toBe('My Message');
        });

        it('should display the "gdprRegister"', () => {
            const props = {
                ...defaultProps,
                loading: false,
                step: 'register',
                data: {
                    UrgentAction: {
                        story: [
                            {
                                ...defaultStep,
                            },
                        ],
                        register: {
                            title: 'Subscribe to Urgent Action Network!',
                            text: 'My Message',
                        },
                    },
                    GdprRegister: {
                        id: '1',
                        type: 'gdpr-register',
                        content: 'Gdpr Stuff',
                    },
                },
            };

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            const renderedComponent = shallow(<UrgentAction {...props} />);

            const register = renderedComponent.find(Register);
            expect(register.length).toBe(1);

            const gdpr = register.prop('gdprRegister');
            expect(gdpr).toBe('Gdpr Stuff');
        });
    });

    describe('Share Step', () => {
        it('should display the "title" and the "text"', () => {
            const props = {
                ...defaultProps,
                loading: false,
                step: 'share',
                data: {
                    UrgentAction: {
                        story: [
                            {
                                ...defaultStep,
                            },
                        ],
                        email_thank: {
                            title: 'Thanks!',
                            text: 'My Message',
                            button: 'Continuer',
                            share: {},
                        },
                    },
                },
            };

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            const renderedComponent = shallow(<UrgentAction {...props} />);

            const share = renderedComponent.find(ShareStep);
            expect(share.length).toBe(1);

            const data = share.prop('data');
            expect(data.title).toBe('Thanks!');
            expect(data.text).toBe('My Message');
        });
    });

    describe('Thanks End Step', () => {
        it('should display thanks if step is "thanks-end"', () => {
            const props = {
                step: 'thanks-end',
                slug: 'one-two-three',
                loading: false,
                data: {
                    UrgentAction: {
                        story: [
                            {
                                ...defaultStep,
                            },
                        ],
                        end_thank: {
                            title: 'Merci de votre engagement !',
                            text: "N'oubliez pas d'envoyer la lettre !",
                        },
                    },
                },
            };

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            const renderedComponent = shallow(<UrgentAction {...props} />);

            const thanks = renderedComponent.find(ThankStep);
            expect(thanks.length).toBe(1);

            const data = thanks.prop('data');
            expect(data.title).toBe('Merci de votre engagement !');
            expect(data.text).toBe("N'oubliez pas d'envoyer la lettre !");
        });
    });
});
