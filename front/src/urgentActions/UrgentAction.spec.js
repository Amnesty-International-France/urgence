import React from 'react';
import { shallow } from 'enzyme';

import { UrgentAction } from './UrgentAction';

const defaultStep = {
    content: '',
    displayOptions: {
        mediumPosition: 'top',
        backgroundColor: 'red',
    },
};

describe('<UrgentAction />', () => {
    describe('render', () => {
        const defaultProps = {
            match: {
                params: {
                    id: '3b6e1a3e-2547-4d77-a310-1b39d15fa03a',
                },
            },
        };

        it('should return null if there is a GraphQL error', () => {
            const props = { ...defaultProps };
            const wrapper = shallow(<UrgentAction {...props} />);

            const render = wrapper.prop('children');

            const renderedComponent = render({
                data: {},
                error: 'An error occured',
            });

            expect(renderedComponent).toBe(null);
        });

        it('should display story with retrieved GraphQL data', () => {
            const props = { ...defaultProps };
            const wrapper = shallow(<UrgentAction {...props} />);
            const render = wrapper.prop('children');

            const renderedComponent = shallow(
                render({
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
                    loading: false,
                }),
            );

            expect(renderedComponent.prop('story')[0].id).toBe(
                '3b6e1a3e-2547-4d77-a310-1b39d15fa03a',
            );
        });
    });
});
