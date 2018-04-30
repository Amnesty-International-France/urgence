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

        it('should display story with retrieved GraphQL data', () => {
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

            expect(renderedComponent.props().render().props.story[0].id).toBe(
                '3b6e1a3e-2547-4d77-a310-1b39d15fa03a',
            );
        });
    });
});
