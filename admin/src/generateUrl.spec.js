import { generateAppUrl } from "./generateUrl";

describe('generateUrl', () => {
    describe('generateAppUrl', () => {
        it('should render correct urgent action route', () => {
            const url = generateAppUrl('urgentAction', { id: '123456-abcdef' });
            expect(url).toBe('http://localhost:3000/UA/123456-abcdef');
        });
    });
})
