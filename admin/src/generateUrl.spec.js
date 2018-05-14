import { generateAppUrl } from "./generateUrl";

describe('generateUrl', () => {
    describe('generateAppUrl', () => {
        it('should render correct urgent action route', () => {
            const url = generateAppUrl('urgentAction', { id: '123456-abcdef' });
            expect(url).toBe('http://localhost:3000/#/UA/123456-abcdef');
        });

        it('should return correct urgent action letter preview URL', () => {
            const url = generateAppUrl('urgentActionLetter', { id: '87d1d7c4-0ecc-48c4-bcce-64bab69e0a61' });
            expect(url).toBe('http://localhost:4000/urgent-actions/87d1d7c4-0ecc-48c4-bcce-64bab69e0a61.pdf?subject=Custom%20subject&signature=John%20Doe');
        });
    });
})
