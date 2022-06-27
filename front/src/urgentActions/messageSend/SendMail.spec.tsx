import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error TS(6142): Module '../../themes/MailTo' was resolved to '/hom... Remove this comment to see the full error message
import MailTo from '../../themes/MailTo';
// @ts-expect-error TS(6142): Module './SendMail' was resolved to '/home/guillau... Remove this comment to see the full error message
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
        (addCampaignMember as any).mockReturnValue(Promise.resolve());
    });

    describe('MailTo', () => {
        it('should render MailTo with body computed from messageTemplate and fullname', () => {
            const props = {
                ...defaultProps,
                ...defaultContext,
            };
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            const wrapper = shallow(<SendMail {...props} />);

            expect(wrapper.find(MailTo).prop('body')).toBe('hello\n\nworld\n\nfirstname lastname');
        });

        it('should render MailTo with recipient props', () => {
            const props = {
                ...defaultProps,
                ...defaultContext,
            };
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            const wrapper = shallow(<SendMail {...props} />);

            expect(wrapper.find(MailTo).prop('recipient')).toBe(defaultProps.recipient);
            expect(wrapper.find(MailTo).prop('afterMail')).toBeInstanceOf(Function);
        });

        it('should render MailTo with object props', () => {
            const props = {
                ...defaultProps,
                ...defaultContext,
            };
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            const wrapper = shallow(<SendMail {...props} />);

            expect(wrapper.find(MailTo).prop('subject')).toBe('object');
        });
    });

    describe('afterMail', () => {
        it('should call afterMail with registered true when clicked', (done) => {
            const addCampaignMemberResult = {
                data: {
                    addCampaignMember: {
                        registered: true,
                    },
                },
            };
            (addCampaignMember as any).mockReturnValue(Promise.resolve(addCampaignMemberResult));

            const props = {
                ...defaultProps,
                ...defaultContext,
                afterMail: jest.fn(),
                registered: 'true',
            };
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            const wrapper = shallow(<SendMail {...props} />);

            wrapper
                .find(MailTo)
                .prop('afterMail')()
                .then(() => {
                    expect(props.afterMail).toHaveBeenCalledWith({ registered: true });
                    done();
                });
        });

        it('should call afterMail with registered false when clicked', (done) => {
            const addCampaignMemberResult = {
                data: {
                    addCampaignMember: {
                        registered: false,
                    },
                },
            };
            (addCampaignMember as any).mockReturnValue(Promise.resolve(addCampaignMemberResult));

            const props = {
                ...defaultProps,
                ...defaultContext,
                afterMail: jest.fn(),
                registered: 'false',
            };
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
