import React from 'react';
import { shallow } from 'enzyme';

import { UrgentAction } from './UrgentAction';
import sessionData from '../sessionData';
import Act from './Act';
import Thanks from './Thanks';
import Story from './story/Story';
import AddressStep from './AddressStep';

jest.mock('../sessionData.js');

const defaultStep = {
    content: '',
    displayOptions: {
        mediumPosition: 'top',
        backgroundColor: 'red',
    },
};

describe('<UrgentAction />', () => {
    const defaultProps = {
        id: '3b6e1a3e-2547-4d77-a310-1b39d15fa03a',
        step: 'story',
        page: '1',
        loading: false,
        data: {
            UrgentAction: {},
        },
    };

    it('should return null if there is a GraphQL error', () => {
        const props = {
            ...defaultProps,
            error: new Error('An error occured'),
        };
        const wrapper = shallow(<UrgentAction foo="bar" {...props} />);

        expect(wrapper.type()).toBe(null);
    });

    it('should display story with retrieved GraphQL data if step is story', () => {
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

    describe('Act Step', () => {
        it('should display act with call_to_action from graphql data if step is act', () => {
            const props = {
                step: 'act',
                loading: false,
                data: {
                    UrgentAction: {
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

    it('should display message with retrieved GraphQL data if step is message', () => {
        const props = {
            ...defaultProps,
            step: 'message',
            data: {
                ...defaultProps.data,
                UrgentAction: {
                    message_template: [{ value: 'first message' }, { value: 'second message' }],
                    object_indication: 'object indication',
                    recipient: {
                        mail: 'mail',
                    },
                },
            },
        };
        const wrapper = shallow(<UrgentAction {...props} />);

        expect(wrapper.prop('messageTemplate')).toBe(props.data.UrgentAction.message_template);
        expect(wrapper.prop('objectIndication')).toBe('object indication');
    });

    it('should display sendMail with retrieved GraphQL data if step is message', () => {
        const props = {
            ...defaultProps,
            step: 'message',
            data: {
                ...defaultProps.data,
                UrgentAction: {
                    message_template: [{ value: 'first message' }, { value: 'second message' }],
                    object_indication: 'object indication',
                    recipient: {
                        mail: 'mail',
                    },
                },
            },
        };
        const wrapper = shallow(<UrgentAction {...props} />);

        const sendMail = wrapper.prop('action');
        expect(sendMail.props.recipient).toEqual({ mail: 'mail' });
        expect(sendMail.props.messageTemplate).toEqual([
            { value: 'first message' },
            { value: 'second message' },
        ]);
    });

    describe('Email Thanks Step', () => {
        it('should display Thanks if step is thanks', () => {
            const props = {
                ...defaultProps,
                loading: false,
                step: 'thanks',
                data: {
                    UrgentAction: {
                        email_thank: {
                            title: 'Thanks!',
                            text: 'My Message',
                            button: 'Continuer',
                        },
                    },
                },
            };

            const renderedComponent = shallow(<UrgentAction {...props} />);

            const thanks = renderedComponent.find(Thanks);
            expect(thanks.length).toBe(1);

            const data = thanks.prop('data');
            expect(data.title).toBe('Thanks!');
            expect(data.text).toBe('My Message');
        });

        it('should add a link to address step as action when there is an address', () => {
            sessionData.getMailObject.mockImplementation(() => 'Hello World!');
            sessionData.getCivility.mockImplementation(() => 'M');
            sessionData.getSurname.mockImplementation(() => 'John');
            sessionData.getName.mockImplementation(() => 'Doe');

            const props = {
                ...defaultProps,
                step: 'thanks',
                id: '123456',
                data: {
                    UrgentAction: {
                        email_thank: {
                            title: 'Thanks!',
                            text: 'My Message',
                            button: 'Continuer',
                        },
                        recipient: {
                            postal_address: 'Ici',
                            button: 'Fin',
                        },
                    },
                },
            };

            const wrapper = shallow(<UrgentAction {...props} />);
            const thanks = wrapper.find(Thanks);
            const action = thanks.prop('actions')();

            expect(action.props.pageName).toBe('address');
            expect(action.props.label).toBe('Continuer');
        });

        it('should not add a link to address step as when there isnt address', () => {
            sessionData.getMailObject.mockImplementation(() => 'Hello World!');
            sessionData.getCivility.mockImplementation(() => 'M');
            sessionData.getSurname.mockImplementation(() => 'John');
            sessionData.getName.mockImplementation(() => 'Doe');

            const props = {
                ...defaultProps,
                step: 'thanks',
                id: '123456',
                data: {
                    UrgentAction: {
                        email_thank: {
                            title: 'Thanks!',
                            text: 'My Message',
                            button: 'Continuer',
                        },
                        recipient: {},
                    },
                },
            };

            const wrapper = shallow(<UrgentAction {...props} />);
            const thanks = wrapper.find(Thanks);
            const action = thanks.prop('actions')();

            expect(action).toBe(null);
        });
    });

    describe('Address Step', () => {
        it('should display AddressStep if step is addres', () => {
            const props = {
                loading: false,
                step: 'address',
                data: {
                    UrgentAction: {
                        email_thank: {
                            title: '',
                        },
                    },
                },
            };
            const wrapper = shallow(<UrgentAction {...props} />);
            expect(wrapper.find(AddressStep).length).toBe(1);
        });

        it('should add a link to thanks-end step as action', () => {
            const props = {
                ...defaultProps,
                step: 'address',
                id: '123456',
                data: {
                    UrgentAction: {
                        recipient: {
                            button: 'Fin',
                        },
                    },
                },
            };

            const wrapper = shallow(<UrgentAction {...props} />);
            const address = wrapper.find(AddressStep);
            const action = address.prop('action')();

            expect(action.props.buttonText).toBe('Fin');
        });
    });

    describe('Thanks End Step', () => {
        it('should display thanks if step is "thanks-end"', () => {
            const props = {
                step: 'thanks-end',
                loading: false,
                data: {
                    UrgentAction: {
                        letter_thank: {
                            title: 'Merci de votre engagement !',
                            text: "N'oubliez pas d'envoyer la lettre !",
                        },
                    },
                },
            };

            const renderedComponent = shallow(<UrgentAction {...props} />);

            const thanks = renderedComponent.find(Thanks);
            expect(thanks.length).toBe(1);

            const data = thanks.prop('data');
            expect(data.title).toBe('Merci de votre engagement !');
            expect(data.text).toBe("N'oubliez pas d'envoyer la lettre !");
        });
    });
});
