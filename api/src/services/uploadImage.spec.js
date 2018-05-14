import { getSavedFileName } from './uploadImage';
import shortid from 'shortid';

jest.mock('shortid');

describe('uploadImage', () => {
    beforeAll(() => {
        shortid.generate.mockImplementation(() => 'random_id');
    });

    describe('getSavedFileName', () => {
        it('should generate filename with random id and keep the extension', () => {
            expect(getSavedFileName('image.jpeg')).toBe('random_id.jpeg');
        });
    });

    afterAll(() => {
        shortid.mockRestore();
    });
});
