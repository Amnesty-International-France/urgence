import UrgentActionsResolver from './resolvers';
import {
    getUrgentAction,
    getUrgentActionBySlug,
    getDefaultUrgentAction,
    getUrgentActions,
    createUrgentAction,
    updateUrgentAction,
    removeUrgentAction,
} from './repository';
import { uploadImageFromStory } from '../services/uploadImageFromStory';
import { authenticate, addCampaignMember, getContactByEmail } from '../services/salesForceApi';

jest.mock('./repository');
jest.mock('../services/uploadImageFromStory');
jest.mock('../services/salesForceApi');

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
                const params = {};
                await UrgentActionsResolver.Query.DefaultUrgentAction(null, params);

                expect(getDefaultUrgentAction).toHaveBeenCalled();
            });
        });

        describe('allUrgentActions', () => {
            it('should query all available urgent actions', async () => {
                await UrgentActionsResolver.Query.allUrgentActions(null, {
                    perPage: 10,
                    page: 1,
                    sortField: 'id',
                    sortOrder: 'asc',
                });
                expect(getUrgentActions).toHaveBeenCalledWith({
                    perPage: 10,
                    page: 1,
                    sortField: 'id',
                    sortOrder: 'asc',
                });
            });
        });
    });

    describe('Mutations', () => {
        describe('createUrgentAction', () => {
            it('should not create given urgent action if user is not authenticated', async () => {
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
                uploadImageFromStory.mockImplementation(() => 'uploadedStory');
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
                    },
                    {
                        user: {
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

                expect(createUrgentAction).toHaveBeenCalledWith({
                    title: 'test',
                    slug: 'test',
                    story: '"uploadedStory"',
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
                });

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
                    },
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
                uploadImageFromStory.mockImplementation(() => 'uploadedStory');
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
                    },
                    {
                        user: {
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

                expect(updateUrgentAction).toHaveBeenCalledWith('id', {
                    id: 'id',
                    title: 'test',
                    slug: 'test',
                    story: '"uploadedStory"',
                    call_to_action: '"call_to_action"',
                    message: '"message"',
                    email_thank: '"email_thank"',
                    register: '"register"',
                    end_thank: '"end_thank"',
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
                    member: { email: 'jean.bon@gmail.com', firstname: 'Jean', lastname: 'Bon' },
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
                    member: { email: 'jean.bon@gmail.com', firstname: 'Jean', lastname: 'Bon' },
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
                    member: { email: 'jean.bon@gmail.com', firstname: 'Jean', lastname: 'Bon' },
                };

                getUrgentAction.mockReturnValue({});
                const response = await UrgentActionsResolver.Mutation.addCampaignMember(
                    null,
                    params,
                );

                expect(response.email).toEqual('jean.bon@gmail.com');
                expect(response.firstname).toEqual('Jean');
                expect(response.lastname).toEqual('Bon');

                expect(authenticate).not.toHaveBeenCalled();
            });

            it('should not call the salesforce api if the campaign code is empty', async () => {
                const params = {
                    id: '16fe5e43-df12-4104-b1fe-77f8b3653802',
                    member: { email: 'jean.bon@gmail.com', firstname: 'Jean', lastname: 'Bon' },
                };

                getUrgentAction.mockReturnValue({ campaign_code: '' });
                const response = await UrgentActionsResolver.Mutation.addCampaignMember(
                    null,
                    params,
                );

                expect(response.email).toEqual('jean.bon@gmail.com');
                expect(response.firstname).toEqual('Jean');
                expect(response.lastname).toEqual('Bon');

                expect(authenticate).not.toHaveBeenCalled();
            });

            it('should call salesforce api', async () => {
                const params = {
                    id: '16fe5e43-df12-4104-b1fe-77f8b3653802',
                    member: { email: 'jean.bon@gmail.com', firstname: 'Jean', lastname: 'Bon' },
                };

                const ua = { campaign_code: 'AU-007', origin_code: 'AU_WEBAPP' };
                getUrgentAction.mockReturnValue(ua);

                const authResponse = {
                    status: 200,
                    body: {
                        access_token: 'psjgf-dfgersdf-sf486sf-sdf',
                    },
                };
                authenticate.mockReturnValue(authResponse);

                const contactResponse = {
                    status: 200,
                    body: {
                        registered: false,
                    },
                };
                getContactByEmail.mockReturnValue(contactResponse);

                const response = await UrgentActionsResolver.Mutation.addCampaignMember(
                    null,
                    params,
                );

                expect(response.email).toEqual('jean.bon@gmail.com');
                expect(response.firstname).toEqual('Jean');
                expect(response.lastname).toEqual('Bon');
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
