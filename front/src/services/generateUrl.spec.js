import generateUrl from './generateUrl';

describe('generateUrl', () => {
    it('should generate url for home', () => {
        expect(generateUrl('home')).toBe('/');
    });

    it('should generate url for ua', () => {
        expect(generateUrl('ua')).toBe('/ua/:slug');
    });

    it('should generate url for ua/slug', () => {
        expect(generateUrl('ua', { slug: 'ua-slug-value' })).toBe('/ua/ua-slug-value');
    });

    it('should generate url for ua/slug/story', () => {
        expect(generateUrl('story', { slug: 'ua-slug-value' })).toBe('/ua/ua-slug-value/story/0');
    });

    it('should generate url for ua/slug/story step', () => {
        expect(generateUrl('story', { slug: 'ua-slug-value', page: 5 })).toBe(
            '/ua/ua-slug-value/story/5',
        );
    });

    it('should generate url for ua/slug/act', () => {
        expect(generateUrl('act', { slug: 'ua-slug-value' })).toBe('/ua/ua-slug-value/act');
    });

    it('should generate url for ua/slug/message', () => {
        expect(generateUrl('message', { slug: 'ua-slug-value' })).toBe('/ua/ua-slug-value/message');
    });

    it('should generate url for ua/slug/thanks', () => {
        expect(generateUrl('thanks', { slug: 'ua-slug-value' })).toBe('/ua/ua-slug-value/thanks');
    });

    it('should generate url for ua/slug/address', () => {
        expect(generateUrl('address', { slug: 'ua-slug-value' })).toBe('/ua/ua-slug-value/address');
    });

    it('should throw error if receiving unknow route', () => {
        expect(() => generateUrl()).toThrow('Unknown route undefined passed to generateUrl');

        expect(() => generateUrl('bad_route')).toThrow(
            'Unknown route bad_route passed to generateUrl',
        );
    });
});
