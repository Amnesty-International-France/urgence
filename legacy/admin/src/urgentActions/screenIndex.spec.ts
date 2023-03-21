import {
    ADDRESS,
    CALL_TO_ACTION,
    getScreenIndex,
    MESSAGE_SEND,
    MESSAGE_VIEW,
    REGISTER,
    SHARE,
    THANKS,
} from './screenIndex';

describe('getScreenIndex', () => {
    it('should return the amount of story steps + the step index', () => {
        const storySteps = 2;

        let index = getScreenIndex(CALL_TO_ACTION, storySteps, 'email');
        expect(index).toEqual(3);

        index = getScreenIndex(MESSAGE_VIEW, storySteps, 'email');
        expect(index).toEqual(4);

        index = getScreenIndex(MESSAGE_SEND, storySteps, 'email');
        expect(index).toEqual(4);

        index = getScreenIndex(ADDRESS, storySteps, 'email');
        expect(index).toEqual(4);

        index = getScreenIndex(REGISTER, storySteps, 'email');
        expect(index).toEqual(5);

        index = getScreenIndex(SHARE, storySteps, 'email');
        expect(index).toEqual(5);

        index = getScreenIndex(THANKS, storySteps, 'email');
        expect(index).toEqual(6);
    });
});
