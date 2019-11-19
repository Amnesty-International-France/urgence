import generateUrl from './generateUrl';

describe('generateUrl', () => {
    it('should generate url for home', () => {
        expect(generateUrl('home')).toBe('/');
    });

    it('should generate url for ua', () => {
        expect(generateUrl('ua')).toBe('/ua/:slug');
    });

    it('should generate url for ua/slug', () => {
        expect(generateUrl('ua', { slug: 'ua-slug' })).toBe('/ua/ua-slug');
    });

    it('should generate url for ua/slug/story', () => {
        expect(generateUrl('story', { slug: 'ua-slug' })).toBe('/ua/ua-slug/story/0');
    });

    it('should generate url for ua/slug/story step', () => {
        expect(generateUrl('story', { slug: 'ua-slug', page: 5 })).toBe('/ua/ua-slug/story/5');
    });

    it('should generate url for ua/slug/act', () => {
        expect(generateUrl('act', { slug: 'ua-slug' })).toBe('/ua/ua-slug/act');
    });

    it('should generate url for ua/slug/message-view', () => {
        expect(generateUrl('message-view', { slug: 'ua-slug' })).toBe('/ua/ua-slug/message-view');
    });

    it('should generate url for ua/slug/message-send', () => {
        expect(generateUrl('message-send', { slug: 'ua-slug' })).toBe('/ua/ua-slug/message-send');
    });

    it('should generate url for ua/slug/thanks', () => {
        expect(generateUrl('thanks', { slug: 'ua-slug' })).toBe('/ua/ua-slug/thanks');
    });

    it('should generate url for ua/slug/register', () => {
        expect(generateUrl('register', { slug: 'ua-slug' })).toBe('/ua/ua-slug/register');
    });

    it('should generate url for ua/slug/share', () => {
        expect(generateUrl('share', { slug: 'ua-slug' })).toBe('/ua/ua-slug/share');
    });

    it('should generate url for ua/slug/address', () => {
        expect(generateUrl('address', { slug: 'ua-slug' })).toBe('/ua/ua-slug/address');
    });

    it('should throw error if receiving unknow route', () => {
        expect(() => generateUrl()).toThrow('Unknown route undefined passed to generateUrl');
        expect(() => generateUrl('bad_route')).toThrow(
            'Unknown route bad_route passed to generateUrl',
        );
    });
});
