import { sessionData } from './sessionData';

describe('sessionData', () => {
    describe('.getMailObject', () => {
        it('calls storage.getItem(amnesty_opbject) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'object value'),
            };

            expect(sessionData(storage).getMailObject()).toBe('object value');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_mail_object');
        });
    });

    describe('.setMailObject', () => {
        it('calls storage.setItem(amnesty_object, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = sessionData(storage);

            expect(mySessionData.setMailObject('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith(
                'amnesty_mail_object',
                'value',
            );
        });
    });
});
