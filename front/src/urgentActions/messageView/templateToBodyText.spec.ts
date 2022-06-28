import { templateToBodyText } from './templateToBodyText';

describe('templateToBodyText', () => {
    it('should convert template array in to a single string joined with double linefeed', () => {
        // @ts-expect-error TS(2554): Expected 4 arguments, but got 1.
        expect(templateToBodyText([{ value: 'hello' }, { value: 'world' }])).toBe('hello\n\nworld');
    });

    it('should trim value', () => {
        // @ts-expect-error TS(2554): Expected 4 arguments, but got 1.
        expect(templateToBodyText([{ value: '    hello    ' }])).toBe('hello');
    });
});
