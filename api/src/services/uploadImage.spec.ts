import { getSavedFileName } from './uploadImage';
import shortid from 'shortid';

jest.mock('shortid');

describe('uploadImage', () => {
    beforeEach(() => {
        shortid.generate.mockImplementation(() => 'random_id');
    });

    describe('getSavedFileName', () => {
        it('should generate filename with random id and keep the extension', () => {
            expect(getSavedFileName()).toBe('random_id.jpeg');
        });
    });
});
