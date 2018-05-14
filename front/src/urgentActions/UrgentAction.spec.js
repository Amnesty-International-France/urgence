import { shallow } from 'enzyme';

import { renderUrgentAction } from './UrgentAction';

const defaultStep = {
    content: '',
    displayOptions: {
        mediumPosition: 'top',
        backgroundColor: 'red',
    },
};

describe('<UrgentAction />', () => {
    describe('renderUrgentAction', () => {
        const defaultParams = {
            id: '3b6e1a3e-2547-4d77-a310-1b39d15fa03a',
            step: 'story',
            page: '1',
        };

        it('should return null if there is a GraphQL error', () => {
            const renderedComponent = renderUrgentAction(defaultParams)({
                data: {},
                error: 'An error occured',
            });

            expect(renderedComponent).toBe(null);
        });

        it('should display story with retrieved GraphQL data if step is story', () => {
            const renderedComponent = shallow(
                renderUrgentAction(defaultParams)({
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
                }),
            );

            expect(renderedComponent.props().render().props.story).toEqual([
                {
                    ...defaultStep,
                    id: '3b6e1a3e-2547-4d77-a310-1b39d15fa03a',
                },
            ]);
        });

        it('should display act with call_to_action from graphql data if step is act', () => {
            const params = {
                step: 'act',
            };
            const props = {
                loading: false,
                data: {
                    UrgentAction: {
                        call_to_action: 'call to action',
                    },
                },
            };
            const renderedComponent = shallow(
                renderUrgentAction(params)(props),
            );

            expect(renderedComponent.prop('callToAction')).toBe(
                'call to action',
            );
        });

        it('should display message with retrieved GraphQL data if step is message', () => {
            const params = {
                step: 'message',
            };
            const props = {
                loading: false,
                data: {
                    UrgentAction: {
                        message_template: [
                            { value: 'first message' },
                            { value: 'second message' },
                        ],
                        object_indication: 'object indication',
                        recipient: {
                            mail: 'mail',
                        },
                    },
                },
            };
            const renderedComponent = shallow(renderUrgentAction(params)(props))
                .props()
                .render();

            expect(renderedComponent.props.messageTemplate).toBe(
                props.data.UrgentAction.message_template,
            );

            expect(renderedComponent.props.objectIndication).toBe(
                'object indication',
            );

            expect(renderedComponent.props.recipient).toEqual({
                mail: 'mail',
            });
        });

        it('should display thanks if step is Thanks', () => {
            const params = {
                step: 'thanks',
            };
            const props = {
                loading: false,
                data: {
                    UrgentAction: {},
                },
            };
            const renderedComponent = shallow(
                renderUrgentAction(params)(props),
            );

            expect(renderedComponent.type().name).toBe('Thanks');
        });
    });
});
