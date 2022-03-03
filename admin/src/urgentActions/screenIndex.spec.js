import {
    get,
    STORY,
    CALL_TO_ACTION,
    MESSAGE_VIEW,
    MESSAGE_SEND,
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
        const formdata = {
            call_to_action: {
                interpelation_mode: 'email',
            },
            story: [1, 2],
        };
        let index = get(CALL_TO_ACTION, formdata);
        expect(index).toEqual(3);

        index = get(MESSAGE_VIEW, formdata);
        expect(index).toEqual(4);

        index = get(MESSAGE_SEND, formdata);
        expect(index).toEqual(4);

        index = get(ADDRESS, formdata);
        expect(index).toEqual(4);

        index = get(REGISTER, formdata);
        expect(index).toEqual(5);

        index = get(SHARE, formdata);
        expect(index).toEqual(5);

        index = get(THANKS, formdata);
        expect(index).toEqual(6);
    });
});
