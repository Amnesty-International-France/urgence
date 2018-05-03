import { validateMedium, validateMail } from './getUrgentActionFormFragment';

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

describe('validateMail', () => {
    it('should return null if mail is valid', () => {
        expect(validateMail('mail@mail')).toBe(null);
        expect(validateMail('mail@gmail.com')).toBe(null);
    });

    it('should return null if comma separated list of mails are valids', () => {
        expect(validateMail('mail@mail,other@mail,third@web.com')).toBe(null);
    });

    it('should return error message if mail is invalid', () => {
        expect(validateMail('notamail')).toBe('Must contain only mail separated by ","');
    });

    it('should return error message if one of the mail is invalid', () => {
        expect(validateMail('mail@mail,notamail,valid@gmail.com')).toBe('Must contain only mail separated by ","');
    });
});
