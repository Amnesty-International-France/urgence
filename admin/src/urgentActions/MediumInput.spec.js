import { validateMedium } from './MediumInput';

describe('validateMedium', () => {
    const record = {
        story: [
            { medium: { src: 'src', title: 'title' } }, // 0 all set no message
            { medium: { src: null, title: null } }, // 1 none set, so no message
            { medium: { src: 'src', title: null } }, // 2 only src set message
            { medium: { src: 'src', title: null } }, // 3 only title set message
        ]
    };

    it('should return undefined if both src and title are set for the corresponding key', () => {
        expect(
            validateMedium('osef', record, null, 'story[0].medium.src')
        ).toBe(undefined);
    });

    it('should return undefined if neither src or title are set for the corresponding key', () => {
        expect(
            validateMedium('osef', record, null, 'story[1].medium.src')
        ).toBe(undefined);
    });

    it('should return error message if only src is set for the corresponding key', () => {
        expect(
            validateMedium('osef', record, null, 'story[2].medium.src')
        ).toBe('You need to specify both src and title for medium or none of them');
    });

    it('should return error message if only title is set for the corresponding key', () => {
        expect(
            validateMedium('osef', record, null, 'story[3].medium.src')
        ).toBe('You need to specify both src and title for medium or none of them');
    });
});
