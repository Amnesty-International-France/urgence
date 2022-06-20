import UrgentActionsResolver from './resolvers';
import {
    getUrgentAction,
    getUrgentActionBySlug,
    getDefaultUrgentAction,
    getUrgentActions,
    createUrgentAction,
    updateUrgentAction,
    removeUrgentAction,
    UrgentAction,
} from './repository';
import { uploadImageFromStory as uploadImageFromStoryOriginal } from '../services/uploadImageFromStory';
import {
    authenticate as authenticateOriginal,
    addCampaignMember,
    getContactByEmail as getContactByEmailOriginal,
} from '../services/salesForceApi';
import { uploadImageDesktopFromStory as uploadImageDesktopFromStoryOriginal } from '../services/uploadImageDesktopFromStory';

jest.mock('./repository');
jest.mock('../services/uploadImageFromStory');
jest.mock('../services/uploadImageDesktopFromStory');
jest.mock('../services/salesForceApi');

const uploadImageFromStory = jest.mocked(uploadImageFromStoryOriginal, true);
const uploadImageDesktopFromStory = jest.mocked(uploadImageDesktopFromStoryOriginal, true);
const authenticate = jest.mocked(authenticateOriginal, true);
const getContactByEmail = jest.mocked(getContactByEmailOriginal, true);

describe('Urgent Actions Resolvers', () => {
    describe('Queries', () => {
        describe('UrgentAction', () => {
            it('should query the urgent action that corresponds to the provided id', async () => {
                const params = { id: '16fe5e43-df12-4104-b1fe-77f8b3653802' };
                await UrgentActionsResolver.Query.UrgentAction(null, params);

                expect(getUrgentAction).toHaveBeenCalledWith(
                    '16fe5e43-df12-4104-b1fe-77f8b3653802',
                );
            });
        });

        describe('UrgentActionBySlug', () => {
            it('should query the urgent action that corresponds to the provided slug', async () => {
                const params = { slug: 'tom-marvolo-riddle' };
                await UrgentActionsResolver.Query.UrgentActionBySlug(null, params);

                expect(getUrgentActionBySlug).toHaveBeenCalledWith('tom-marvolo-riddle');
            });
        });

        describe('DefaultUrgentAction', () => {
            it('should query the default urgent action', async () => {
                await UrgentActionsResolver.Query.DefaultUrgentAction();

                expect(getDefaultUrgentAction).toHaveBeenCalled();
            });
        });

        describe('allUrgentActions', () => {
            it('should query all available urgent actions', async () => {
                await UrgentActionsResolver.Query.allUrgentActions(null, {
                    perPage: 10,
                    page: 1,
                    sortField: 'id',
                    sortOrder: 'ASC',
                });
                expect(getUrgentActions).toHaveBeenCalledWith({
                    perPage: 10,
                    page: 1,
                    sortField: 'id',
                    sortOrder: 'ASC',
                });
            });
        });
    });

    describe('Mutations', () => {
        describe('createUrgentAction', () => {
            it('should not create given urgent action if user is not authenticated', async () => {
                // @ts-ignore
                const result = await UrgentActionsResolver.Mutation.createUrgentAction(null, {
                    title: 'test',
                    slug: 'test',
                    story: [
                        {
                            content: 'this is a test',
                            displayOptions: {
                                position: 'top',
                                backgroundColor: 'FFFF00',
                            },
                            medium: {
                                src: 'picture.gif',
                                title: 'a picture',
                            },
                        },
                    ],
                });

                expect(result).toBe(null);
            });

            it('should not create given urgent action if user is not an admin', async () => {
                const result = await UrgentActionsResolver.Mutation.createUrgentAction(
                    null,
                    {
                        title: 'test',
                        slug: 'test',
                        story: [
                            {
                                content: 'this is a test',
                                displayOptions: {
                                    position: 'top',
                                    backgroundColor: 'FFFF00',
                                },
                                medium: {
                                    src: 'picture.gif',
                                    title: 'a picture',
                                },
                            },
                        ],
                        id: '',
                        is_default: false,
                        campaign_code: '',
                        origin_code: '',
                        call_to_action: '',
                        register: '',
                        end_thank: '',
                        creation_date: '',
                        response_count: 0,
                        social_metadata: {
                            title: '',
                            description: '',
                            medium: {
                                src: '',
                            },
                        },
                        email_thank: {
                            title: '',
                            text: '',
                            button: '',
                            share: {
                                message: '',
                                twitter_message: '',
                            },
                            telegram: {
                                url: '',
                                message: '',
                            },
                        },
                        message: {
                            text_view: '',
                            text_send: '',
                            button_view: '',
                            button_send: '',
                            object_indication: '',
                            object_example: '',
                            message_template: [],
                            recipient: {
                                postal_address: '',
                            },
                        },
                    },
                    {
                        user: {
                            login: 'adrien',
                            role: 'superstar',
                        },
                    },
                );

                expect(result).toBe(null);
            });

            it('should create given urgent action', async () => {
                // @ts-ignore
                uploadImageFromStory.mockImplementation(() => 'uploadedStory');
                // @ts-ignore
                uploadImageDesktopFromStory.mockImplementation(() => 'uploadedDesktopStory');

                const authResponse = Promise.resolve({
                    status: 200,
                    body: {
                        access_token: 'psjgf-dfgersdf-sf486sf-sdf',
                    },
                });
                authenticate.mockReturnValue(authResponse);
                await UrgentActionsResolver.Mutation.createUrgentAction(
                    null,
                    {
                        title: 'test',
                        slug: 'test',
                        story: [
                            {
                                content: 'this is a test',
                                displayOptions: {
                                    position: 'top',
                                    backgroundColor: 'FFFF00',
                                },
                                medium: {
                                    src: 'picture.gif',
                                    title: 'a picture',
                                },
                            },
                        ],
                    } as unknown as UrgentAction,
                    {
                        user: {
                            login: 'azerty',
                            role: 'admin',
                        },
                    },
                );

                expect(uploadImageFromStory).toHaveBeenCalledWith([
                    {
                        content: 'this is a test',
                        displayOptions: {
                            position: 'top',
                            backgroundColor: 'FFFF00',
                        },
                        medium: {
                            src: 'picture.gif',
                            title: 'a picture',
                        },
                    },
                ]);
                expect(uploadImageDesktopFromStory).toHaveBeenCalled();

                expect(createUrgentAction).toHaveBeenCalledWith({
                    title: 'test',
                    slug: 'test',
                    story: '"uploadedDesktopStory"',
                    social_metadata: '{}',
                });
            });
        });

        describe('updateUrgentAction', () => {
            it('should not update urgent action if user is not authenticated', async () => {
                const result = await UrgentActionsResolver.Mutation.updateUrgentAction(null, {
                    id: 'id',
                    title: 'test',
                    slug: 'test',
                    story: [
                        {
                            content: 'this is a test',
                            displayOptions: {
                                position: 'top',
                                backgroundColor: 'FFFF00',
                            },
                            medium: {
                                src: 'picture.gif',
                                title: 'a picture',
                            },
                        },
                    ],
                    call_to_action: 'call_to_action',
                    message: 'message',
                    email_thank: 'email_thank',
                    register: 'register',
                    end_thank: 'end_thank',
                } as unknown as UrgentAction);

                expect(result).toBe(null);
            });

            it('should not update urgent action if user is not an admin', async () => {
                const result = await UrgentActionsResolver.Mutation.updateUrgentAction(
                    null,
                    {
                        id: 'id',
                        title: 'test',
                        slug: 'test',
                        story: [
                            {
                                content: 'this is a test',
                                displayOptions: {
                                    position: 'top',
                                    backgroundColor: 'FFFF00',
                                },
                                medium: {
                                    src: 'picture.gif',
                                    title: 'a picture',
                                },
                            },
                        ],
                        call_to_action: 'call_to_action',
                        message: 'message',
                        email_thank: 'email_thank',
                        register: 'register',
                        end_thank: 'end_thank',
                    } as unknown as UrgentAction,
                    {
                        user: {
                            login: 'julien',
                            role: 'bg',
                        },
                    },
                );

                expect(result).toBe(null);
            });

            it('should update urgent action with given id with remaining data', async () => {
                // @ts-ignore
                uploadImageFromStory.mockImplementation(() => 'uploadedStory');
                // @ts-ignore
                uploadImageDesktopFromStory.mockImplementation(() => 'uploadedDesktopStory');

                const authResponse = Promise.resolve({
                    status: 200,
                    body: {
                        access_token: 'psjgf-dfgersdf-sf486sf-sdf',
                    },
                });
                authenticate.mockReturnValue(authResponse);
                await UrgentActionsResolver.Mutation.updateUrgentAction(
                    null,
                    {
                        id: 'id',
                        title: 'test',
                        slug: 'test',
                        story: [
                            {
                                content: 'this is a test',
                                displayOptions: {
                                    position: 'top',
                                    backgroundColor: 'FFFF00',
                                },
                                medium: {
                                    src: 'picture.gif',
                                    title: 'a picture',
                                },
                            },
                        ],
                        call_to_action: 'call_to_action',
                        message: 'message',
                        email_thank: 'email_thank',
                        register: 'register',
                        end_thank: 'end_thank',
                    } as unknown as UrgentAction,
                    {
                        user: {
                            login: 'azerty',
                            role: 'admin',
                        },
                    },
                );

                expect(uploadImageFromStory).toHaveBeenCalledWith([
                    {
                        content: 'this is a test',
                        displayOptions: {
                            position: 'top',
                            backgroundColor: 'FFFF00',
                        },
                        medium: {
                            src: 'picture.gif',
                            title: 'a picture',
                        },
                    },
                ]);

                expect(uploadImageDesktopFromStory).toHaveBeenCalled();
                expect(updateUrgentAction).toHaveBeenCalledWith('id', {
                    id: 'id',
                    title: 'test',
                    slug: 'test',
                    story: '"uploadedDesktopStory"',
                    call_to_action: '"call_to_action"',
                    message: '"message"',
                    email_thank: '"email_thank"',
                    register: '"register"',
                    end_thank: '"end_thank"',
                    social_metadata: '{}',
                });
            });
        });

        describe('deleteUrgentAction', () => {
            it('should not remove urgent action if user is not authenticated', async () => {
                const result = await UrgentActionsResolver.Mutation.deleteUrgentAction(null, 'id');

                expect(result).toBe(null);
            });

            it('should not remove urgent action if user is not an admin', async () => {
                const result = await UrgentActionsResolver.Mutation.deleteUrgentAction(null, 'id', {
                    user: {
                        login: 'julien',
                        role: 'bg',
                    },
                });

                expect(result).toBe(null);
            });

            it('should remove urgent action with given id', async () => {
                await UrgentActionsResolver.Mutation.deleteUrgentAction(null, 'id', {
                    user: {
                        login: 'azerty',
                        role: 'admin',
                    },
                });
                expect(removeUrgentAction).toHaveBeenCalledWith('id');
            });
        });

        describe('addCampaignMember', () => {
            it('should return an exception the campaign id is invalid', async () => {
                const params = {
                    id: '16fe5e',
                    member: {
                        email: 'jean.bon@gmail.com',
                        firstname: 'Jean',
                        lastname: 'Bon',
                        civility: 'Autre' as const,
                    },
                };
                const response = await UrgentActionsResolver.Mutation.addCampaignMember(
                    null,
                    params,
                );

                expect(response).toEqual(Error('Invalid UUID format: 16fe5e'));
                expect(authenticate).not.toHaveBeenCalled();
            });

            it('should return an exception the campaign id does not exist', async () => {
                const params = {
                    id: '16fe5e43-df12-4104-b1fe-77f8b3653802',
                    member: {
                        email: 'jean.bon@gmail.com',
                        firstname: 'Jean',
                        lastname: 'Bon',
                        civility: 'Autre' as const,
                    },
                };
                const response = await UrgentActionsResolver.Mutation.addCampaignMember(
                    null,
                    params,
                );

                expect(response).toEqual(Error('Not Found'));
                expect(authenticate).not.toHaveBeenCalled();
            });

            it('should not call the salesforce api if the campaign code is not defined', async () => {
                const params = {
                    id: '16fe5e43-df12-4104-b1fe-77f8b3653802',
                    member: {
                        email: 'jean.bon@gmail.com',
                        firstname: 'Jean',
                        lastname: 'Bon',
                        civility: 'Autre' as const,
                    },
                };

                // @ts-ignore
                getUrgentAction.mockReturnValue({});
                const response = await UrgentActionsResolver.Mutation.addCampaignMember(
                    null,
                    params,
                );
                // @ts-ignore
                expect(response.email).toEqual('jean.bon@gmail.com');
                // @ts-ignore
                expect(response.firstname).toEqual('Jean');
                // @ts-ignore
                expect(response.lastname).toEqual('Bon');

                expect(authenticate).not.toHaveBeenCalled();
            });

            it('should not call the salesforce api if the campaign code is empty', async () => {
                const params = {
                    id: '16fe5e43-df12-4104-b1fe-77f8b3653802',
                    member: {
                        email: 'jean.bon@gmail.com',
                        firstname: 'Jean',
                        lastname: 'Bon',
                        civility: 'Autre' as const,
                    },
                };

                // @ts-ignore
                getUrgentAction.mockReturnValue({ campaign_code: '' });
                const response = await UrgentActionsResolver.Mutation.addCampaignMember(
                    null,
                    params,
                );

                // @ts-ignore
                expect(response.email).toEqual('jean.bon@gmail.com');
                // @ts-ignore
                expect(response.firstname).toEqual('Jean');
                // @ts-ignore
                expect(response.lastname).toEqual('Bon');

                expect(authenticate).not.toHaveBeenCalled();
            });

            it('should call salesforce api', async () => {
                const params = {
                    id: '16fe5e43-df12-4104-b1fe-77f8b3653802',
                    member: {
                        email: 'jean.bon@gmail.com',
                        firstname: 'Jean',
                        lastname: 'Bon',
                        civility: 'Autre' as const,
                    },
                };

                const ua = Promise.resolve({ campaign_code: 'AU-007', origin_code: 'AU_WEBAPP' });
                // @ts-ignore
                getUrgentAction.mockReturnValue(ua);

                const authResponse = Promise.resolve({
                    status: 200,
                    body: {
                        access_token: 'psjgf-dfgersdf-sf486sf-sdf',
                    },
                });
                authenticate.mockReturnValue(authResponse);

                const contactResponse = Promise.resolve({
                    status: 200,
                    body: {
                        registered: false,
                    },
                });
                // @ts-ignore
                getContactByEmail.mockReturnValue(contactResponse);

                const response = await UrgentActionsResolver.Mutation.addCampaignMember(
                    null,
                    params,
                );
                // @ts-ignore
                expect(response.email).toEqual('jean.bon@gmail.com');
                // @ts-ignore
                expect(response.firstname).toEqual('Jean');
                // @ts-ignore
                expect(response.lastname).toEqual('Bon');
                // @ts-ignore
                expect(response.registered).toEqual(false);

                expect(addCampaignMember).toHaveBeenCalledWith('psjgf-dfgersdf-sf486sf-sdf', ua, {
                    email: 'jean.bon@gmail.com',
                    firstname: 'Jean',
                    lastname: 'Bon',
                });
                expect(getContactByEmail).toHaveBeenCalledWith(
                    'psjgf-dfgersdf-sf486sf-sdf',
                    'jean.bon@gmail.com',
                );
            });
        });
    });
});
