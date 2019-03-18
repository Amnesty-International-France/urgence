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

    it('should generate url for ua/id/story', () => {
        expect(generateUrl('story', { id: 'id_value' })).toBe('/ua/id_value/story/0');
    });

    it('should generate url for ua/id/story step', () => {
        expect(generateUrl('story', { id: 'id_value', page: 5 })).toBe('/ua/id_value/story/5');
    });

    it('should generate url for ua/id/act', () => {
        expect(generateUrl('act', { id: 'id_value' })).toBe('/ua/id_value/act');
    });

    it('should generate url for ua/id/message', () => {
        expect(generateUrl('message', { id: 'id_value' })).toBe('/ua/id_value/message');
    });

    it('should generate url for ua/id/object', () => {
        expect(generateUrl('object', { id: 'id_value' })).toBe('/ua/id_value/object');
    });

    it('should generate url for ua/id/civility', () => {
        expect(generateUrl('civility', { id: 'id_value' })).toBe('/ua/id_value/civility');
    });

    it('should generate url for ua/id/surname', () => {
        expect(generateUrl('surname', { id: 'id_value' })).toBe('/ua/id_value/surname');
    });

    it('should generate url for ua/id/name', () => {
        expect(generateUrl('name', { id: 'id_value' })).toBe('/ua/id_value/name');
    });

    it('should generate url for ua/id/thanks', () => {
        expect(generateUrl('thanks', { id: 'id_value' })).toBe('/ua/id_value/thanks');
    });

    it('should generate url for ua/id/addressMain', () => {
        expect(generateUrl('addressMain', { id: 'id_value' })).toBe('/ua/id_value/addressMain');
    });

    it('should generate url for ua/id/addressMore', () => {
        expect(generateUrl('addressMore', { id: 'id_value' })).toBe('/ua/id_value/addressMore');
    });

    it('should generate url for ua/id/postalCode', () => {
        expect(generateUrl('postalCode', { id: 'id_value' })).toBe('/ua/id_value/postalCode');
    });

    it('should generate url for ua/id/city', () => {
        expect(generateUrl('city', { id: 'id_value' })).toBe('/ua/id_value/city');
    });

    it('should generate url for ua/id/country', () => {
        expect(generateUrl('country', { id: 'id_value' })).toBe('/ua/id_value/country');
    });

    it('should throw error if receiving unknow route', () => {
        expect(() => generateUrl()).toThrow('Unknown route undefined passed to generateUrl');

        expect(() => generateUrl('bad_route')).toThrow(
            'Unknown route bad_route passed to generateUrl',
        );
    });
});
