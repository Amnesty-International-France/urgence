import { black, white, textColorForBackgroundColor } from './colors';

describe('Colors', () => {
    describe('textColorForBackgroundColor', () => {
        it('should return correct text color depending background color', () => {
            expect(textColorForBackgroundColor('black')).toBe(white);
            expect(textColorForBackgroundColor('white')).toBe(black);
            expect(textColorForBackgroundColor('yellow')).toBe(black);
            expect(textColorForBackgroundColor('pink')).toBe(white);
            expect(textColorForBackgroundColor('orange')).toBe(black);
        });
    });
});
