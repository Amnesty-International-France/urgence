import omitDeep from './omitDeep';

describe('omitDeep', () => {
    it('should omit keys from object', () => {
        expect(omitDeep(['do', 'not', 'want', '__typename'], {
            do: 'remove',
            not: 'reject',
            want: 'discard',
            keep: 'value'
        })).toEqual({
            keep: 'value',
        })
    });

    it('should omit keys from array of Object', () => {
        expect(omitDeep(['do', 'not', 'want', '__typename'], [{
            do: 'remove',
            keep: 'value1'
        }, {
            not: 'reject',
            keep: 'value2'
        }, {
            want: 'discard',
            keep: 'value3'
        }])).toEqual([
            { keep: 'value1' },
            { keep: 'value2' },
            { keep: 'value3' },
        ])
    });

    it('should work recursively', () => {
        expect(omitDeep(['do', 'not', 'want'], {
            do: 'remove',
            not: 'reject',
            want: 'discard',
            keep: {
                do: 'remove',
                not: 'reject',
                want: 'discard',
                recursive: 'value',
            }
        })).toEqual({
            keep: {
                recursive: 'value',
            },
        })
    });
});
