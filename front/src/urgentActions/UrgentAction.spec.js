import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';

import { renderUrgentActionWithData, UrgentAction } from './UrgentAction';
import Story from './story/Story';
import Act from './Act';
import MessageView from './message-view/MessageView';
import MessageSend from './message-send/MessageSend';
import Share from './share/Share';
import Register from './register/Register';
import ThankStep from './ThankStep';

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

        const UrgentActionWithData = renderUrgentActionWithData('on-the-way', 'story');
        const wrapper = shallow(<UrgentActionWithData {...props} />);

        const loading = wrapper.find(LoadingScreen);
        expect(loading.length).toEqual(1);
    });

    it('should Redirect to the error page if there is a GraphQL error', () => {
        const props = {
            ...defaultProps,
            error: new Error('An error occured'),
        };

        const UrgentActionWithData = renderUrgentActionWithData('on-the-way', 'story');
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
            const wrapper = shallow(<UrgentAction {...props} />);
            const story = wrapper.find(Story);

            expect(story.prop('story')).toEqual([
                {
                    ...defaultStep,
                    id: '3b6e1a3e-2547-4d77-a310-1b39d15fa03a',
                },
            ]);
        });
    });

    describe('Act Step', () => {
        it('should display the "title" and the "message"', () => {
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
            const renderedComponent = shallow(<UrgentAction {...props} />);
            expect(renderedComponent.find(Act).length).toBe(1);

            const data = renderedComponent.prop('data');
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
                            message_template: [
                                { value: 'first message' },
                                { value: 'second message' },
                            ],
                        },
                    },
                },
            };

            const renderedComponent = shallow(<UrgentAction {...props} />);

            const message = renderedComponent.find(MessageView);
            expect(message.length).toBe(1);

            expect(message.prop('objectIndication')).toBe('object indication');
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

            const renderedComponent = shallow(<UrgentAction {...props} />);

            const share = renderedComponent.find(Share);
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

            const renderedComponent = shallow(<UrgentAction {...props} />);

            const thanks = renderedComponent.find(ThankStep);
            expect(thanks.length).toBe(1);

            const data = thanks.prop('data');
            expect(data.title).toBe('Merci de votre engagement !');
            expect(data.text).toBe("N'oubliez pas d'envoyer la lettre !");
        });
    });
});
