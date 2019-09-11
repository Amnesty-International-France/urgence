import React from 'react';
import { shallow } from 'enzyme';

import MailTo from '../../themes/MailTo';
import { SendMail } from './SendMail';

import { addCampaignMember } from '../../services/api';

jest.mock('../../services/api');

describe('SendMail', () => {
    const defaultProps = {
        auId: '1',
        step: 'message',
        messageTemplate: [{ value: 'hello' }, { value: 'world' }],
        recipient: { mail: 'mail' },
    };
    const defaultContext = {
        object: 'object',
        civility: 'civility',
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'first.last@salut.fr',
        registered: 'true',
    };

    beforeEach(() => {
        addCampaignMember.mockReturnValue(Promise.resolve());
    });

    describe('MailTo', () => {
        it('should render MailTo with body computed from messageTemplate and fullname', () => {
            const props = {
                ...defaultProps,
                ...defaultContext,
            };
            const wrapper = shallow(<SendMail {...props} />);

            expect(wrapper.find(MailTo).prop('body')).toBe('hello\n\nworld\n\nfirstname lastname');
        });

        it('should render MailTo with recipient props', () => {
            const props = {
                ...defaultProps,
                ...defaultContext,
            };
            const wrapper = shallow(<SendMail {...props} />);

            expect(wrapper.find(MailTo).prop('recipient')).toBe(defaultProps.recipient);
            expect(wrapper.find(MailTo).prop('afterMail')).toBeInstanceOf(Function);
        });

        it('should render MailTo with object props', () => {
            const props = {
                ...defaultProps,
                ...defaultContext,
            };
            const wrapper = shallow(<SendMail {...props} />);

            expect(wrapper.find(MailTo).prop('subject')).toBe('object');
        });
    });

    describe('afterMail', () => {
        it('should call afterMail with registered true when clicked', done => {
            const addCampaignMemberResult = {
                data: {
                    addCampaignMember: {
                        registered: true,
                    },
                },
            };
            addCampaignMember.mockReturnValue(Promise.resolve(addCampaignMemberResult));

            const props = {
                ...defaultProps,
                ...defaultContext,
                afterMail: jest.fn(),
                registered: 'true',
            };
            const wrapper = shallow(<SendMail {...props} />);

            wrapper
                .find(MailTo)
                .prop('afterMail')()
                .then(() => {
                    expect(props.afterMail).toHaveBeenCalledWith({ registered: true });
                    done();
                });
        });

        it('should call afterMail with registered false when clicked', done => {
            const addCampaignMemberResult = {
                data: {
                    addCampaignMember: {
                        registered: false,
                    },
                },
            };
            addCampaignMember.mockReturnValue(Promise.resolve(addCampaignMemberResult));

            const props = {
                ...defaultProps,
                ...defaultContext,
                afterMail: jest.fn(),
                registered: 'false',
            };
            const wrapper = shallow(<SendMail {...props} />);

            wrapper
                .find(MailTo)
                .prop('afterMail')()
                .then(() => {
                    expect(props.afterMail).toHaveBeenCalledWith({ registered: false });
                    done();
                });
        });
    });
});
