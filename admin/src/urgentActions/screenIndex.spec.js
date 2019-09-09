import {
    get,
    STORY,
    CALL_TO_ACTION,
    MESSAGE,
    ADDRESS,
    REGISTER,
    SHARE,
    THANKS,
} from './screenIndex';

describe('screenIndex.get', () => {
    it("should return the story step index if it's the STORY", () => {
        const index = get(STORY, null, 2);
        expect(index).toEqual(2);
    });

    it("should return the amount of story steps + the step index if it's other steps", () => {
        let index = get(CALL_TO_ACTION, { story: [1, 2] });
        expect(index).toEqual(3);

        index = get(MESSAGE, { story: [1, 2] });
        expect(index).toEqual(4);

        index = get(ADDRESS, { story: [1, 2] });
        expect(index).toEqual(4);

        index = get(REGISTER, { story: [1, 2] });
        expect(index).toEqual(5);

        index = get(SHARE, { story: [1, 2] });
        expect(index).toEqual(5);

        index = get(THANKS, { story: [1, 2] });
        expect(index).toEqual(6);
    });
});
