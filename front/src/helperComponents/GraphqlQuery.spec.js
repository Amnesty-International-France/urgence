import enzyme from 'enzyme';

import { handleLoading } from './GraphqlQuery';

describe('GrapĥqlQuery', () => {
    describe('handleLoading', () => {
        it('should call render with data and return its result', () => {
            const render = jest.fn().mockReturnValueOnce('render result');
            expect(handleLoading(render)({ data: 'data' })).toBe(
                'render result',
            );
            expect(render.mock.calls.length).toBe(1);
            expect(render.mock.calls[0]).toEqual(['data']);
        });

        it('should return `Loading...` wrapped in Text and not call render when loading is true', () => {
            const render = jest.fn();
            const result = handleLoading(render)({ loading: true });

            expect(enzyme.mount(result).text()).toBe('Loading...');
            expect(render.mock.calls.length).toBe(0);
        });

        it('should return error wrapped in Text and not call render receiving an error', () => {
            const render = jest.fn();
            const result = handleLoading(render)({ error: new Error('Boom') });

            expect(enzyme.mount(result).text()).toBe('Error: Boom');
            expect(render.mock.calls.length).toBe(0);
        });
    });
});
