import { templateToBodyText } from './templateToBodyText';

describe('templateToBodyText', () => {
    it('should convert template array in to a single string joined with double linefeed', () => {
        expect(templateToBodyText([{ value: 'hello' }, { value: 'world' }])).toBe('hello\n\nworld');
    });

    it('should trim value', () => {
        expect(templateToBodyText([{ value: '    hello    ' }])).toBe('hello');
    });
});
