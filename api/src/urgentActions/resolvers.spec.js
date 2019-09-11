import UrgentActionsResolver from './resolvers';
import {
    getUrgentAction,
    getUrgentActionBySlug,
    getUrgentActions,
    createUrgentAction,
    updateUrgentAction,
    removeUrgentAction,
} from './repository';
import { uploadImageFromStory } from '../services/uploadImageFromStory';
import { authenticate, registerCampaignMember, getContactByEmail } from '../services/salesForceApi';

jest.mock('./repository');
jest.mock('../services/uploadImageFromStory');
jest.mock('../services/salesForceApi');

describe('Urgent Actions Resolvers', () => {
    describe('Queries', () => {
        describe('UrgentAction', () => {
            it('should query urgent actions with corresponding id', async () => {
                const params = { id: '16fe5e43-df12-4104-b1fe-77f8b3653802' };
                await UrgentActionsResolver.Query.UrgentAction(null, params);

                expect(getUrgentAction).toHaveBeenCalledWith(
                    '16fe5e43-df12-4104-b1fe-77f8b3653802',
                );
            });
        });

        describe('UrgentActionBySlug', () => {
            it('should query urgent actions with corresponding slug', async () => {
                const params = { slug: 'tom-marvolo-riddle' };
                await UrgentActionsResolver.Query.UrgentActionBySlug(null, params);

                expect(getUrgentActionBySlug).toHaveBeenCalledWith('tom-marvolo-riddle');
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

        describe('createUrgentAction', () => {
            it('should create given urgent action', async () => {
                uploadImageFromStory.mockImplementation(() => 'uploadedStory');
                await UrgentActionsResolver.Mutation.createUrgentAction(null, {
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
            it('should update urgent action with given id with remaining data', async () => {
                uploadImageFromStory.mockImplementation(() => 'uploadedStory');
                await UrgentActionsResolver.Mutation.updateUrgentAction(null, {
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
                    email_thank: 'email_thank',
                    register: 'register',
                    end_thank: 'end_thank',
                    message_template: 'message_template',
                });

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
                    email_thank: '"email_thank"',
                    register: '"register"',
                    end_thank: '"end_thank"',
                    message_template: '"message_template"',
                });
            });
        });

        describe('deleteUrgentAction', () => {
            it('should remove urgent action with given id', async () => {
                await UrgentActionsResolver.Mutation.deleteUrgentAction(null, 'id');
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

                const ua = { campaign_code: 'AU-007', origin_code: 'AU_WEB_APP' };
                getUrgentAction.mockReturnValue(ua);

                const authResponse = {
                    status: 200,
                    json: async () =>
                        Promise.resolve({ access_token: 'psjgf-dfgersdf-sf486sf-sdf' }),
                };
                authenticate.mockReturnValue(authResponse);

                const campaingMemberDetails = { registered: false };
                getContactByEmail.mockReturnValue(campaingMemberDetails);

                const response = await UrgentActionsResolver.Mutation.addCampaignMember(
                    null,
                    params,
                );

                expect(response.email).toEqual('jean.bon@gmail.com');
                expect(response.firstname).toEqual('Jean');
                expect(response.lastname).toEqual('Bon');
                expect(response.registered).toEqual(false);

                expect(registerCampaignMember).toHaveBeenCalledWith(
                    'psjgf-dfgersdf-sf486sf-sdf',
                    ua,
                    { email: 'jean.bon@gmail.com', firstname: 'Jean', lastname: 'Bon' },
                );
                expect(getContactByEmail).toHaveBeenCalledWith(
                    'psjgf-dfgersdf-sf486sf-sdf',
                    'jean.bon@gmail.com',
                );
            });
        });
    });
});
