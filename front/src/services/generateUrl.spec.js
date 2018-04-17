import generateUrl from './generateUrl';

describe('generateUrl', () => {
    it('should generate url for home', () => {
        expect(generateUrl('home')).toBe('/');
    });

    it('should generate url for ua', () => {
        expect(generateUrl('ua')).toBe('/ua/:id');
    });

    it('should generate url for ua/id', () => {
        expect(generateUrl('ua', { id: 'id_value' })).toBe('/ua/id_value');
    });

    it('should generate home url per default', () => {
        expect(generateUrl()).toBe('/');
    });
});
