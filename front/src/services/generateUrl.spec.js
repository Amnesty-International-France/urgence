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

    it('should generate url for ua/id/signature', () => {
        expect(generateUrl('signature', { id: 'id_value' })).toBe('/ua/id_value/signature');
    });

    it('should generate url for ua/id/thanks', () => {
        expect(generateUrl('thanks', { id: 'id_value' })).toBe('/ua/id_value/thanks');
    });

    it('should generate url for ua/id/address', () => {
        expect(generateUrl('address', { id: 'id_value' })).toBe('/ua/id_value/address');
    });

    it('should throw error if receiving unknow route', () => {
        expect(() => generateUrl()).toThrow('Unknown route undefined passed to generateUrl');

        expect(() => generateUrl('bad_route')).toThrow(
            'Unknown route bad_route passed to generateUrl',
        );
    });
});
