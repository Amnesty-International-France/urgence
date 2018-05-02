import { sessionData } from './sessionData';

describe('sessionData', () => {
    describe('.getObject', () => {
        it('call storage.getItem(amnesty_opbject) and return its result', () => {
            const storage = {
                getItem: jest.fn(() => 'object value'),
            };

            expect(sessionData(storage).getObject()).toBe('object value');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_object');
        });
    });

    describe('.setObject', () => {
        it('call storage.setItem(amnesty_opbject, value) and return itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = sessionData(storage);

            expect(mySessionData.setObject('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith(
                'amnesty_object',
                'value',
            );
        });
    });
});
