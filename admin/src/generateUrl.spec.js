import { generateAppUrl } from './generateUrl';

describe('generateUrl', () => {
    describe('generateAppUrl', () => {
        it('should render correct urgent action route', () => {
            const url = generateAppUrl('urgentAction', { slug: 'darth-sidious-is-alive' });
            expect(url).toBe('http://localhost:3000/ua/darth-sidious-is-alive');
        });

        it('should return correct urgent action letter preview URL', () => {
            const url = generateAppUrl('urgentActionLetter', {
                id: '87d1d7c4-0ecc-48c4-bcce-64bab69e0a61',
            });
            expect(url).toMatchSnapshot();
        });
    });
});
