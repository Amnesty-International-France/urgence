import React from 'react';
import { shallow } from 'enzyme';

import { UrgentAction } from './UrgentAction';
import sessionData from '../sessionData';
import Thanks from './Thanks';
import Story from './Story';

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
            UrgentAction: {
                email_thank: {
                    title: 'Thanks!',
                },
            },
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

    it('should display act with call_to_action from graphql data if step is act', () => {
        const props = {
            step: 'act',
            loading: false,
            data: {
                UrgentAction: {
                    call_to_action: 'call to action',
                },
            },
        };
        const renderedComponent = shallow(<UrgentAction {...props} />);

        expect(renderedComponent.prop('callToAction')).toBe('call to action');
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
    });

    it('should display subject with retrieved GraphQL data if step is object', () => {
        const props = {
            loading: false,
            step: 'object',
            data: {
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

        expect(wrapper.prop('objectIndication')).toBe('object indication');
    });

    it('should display signatureStep with retrieved GraphQL data if step is signature', () => {
        const props = {
            loading: false,
            step: 'signature',
            data: {
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
                loading: false,
                step: 'thanks',
                data: {
                    UrgentAction: {
                        email_thank: {
                            title: '',
                        },
                    },
                },
            };
            const wrapper = shallow(<UrgentAction {...props} />);
            expect(wrapper.find(Thanks).length).toBe(1);
        });

        it('should add a link to address step as action', () => {
            sessionData.getMailObject.mockImplementation(() => 'Hello World!');
            sessionData.getSignature.mockImplementation(() => 'John Doe');

            const props = {
                ...defaultProps,
                step: 'thanks',
                id: '123456',
            };

            const wrapper = shallow(<UrgentAction {...props} />);
            const thanks = wrapper.find(Thanks);
            const action = thanks.prop('actions')();

            expect(action.props.pageName).toBe('address');
            expect(action.props.label).toBe('Continuer');
        });
    });

    describe('Letter Thanks Step', () => {
        it('should display thanks if step is "thanks-letter"', () => {
            const props = {
                step: 'thanks-letter',
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
            expect(thanks.prop('title')).toBe('Merci de votre engagement !');
            expect(thanks.prop('text')).toBe("N'oubliez pas d'envoyer la lettre !");
        });
    });
});
