import { validateMail } from './getUrgentActionFormFragment';

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
