export const STORY = 0;
export const CALL_TO_ACTION = 1;
export const MESSAGE_VIEW = 2;
export const MESSAGE_SEND = 2;
export const ADDRESS = 2;
export const REGISTER = 3;
export const SHARE = 3;
export const THANKS = 4;

export const getScreenIndex = (
    step: number,
    storySteps: number,
    interpelation_mode: 'email' | 'rs',
) => {
    const callToActionMode = interpelation_mode === 'email' ? 0 : 1;

    const stepWithStory = storySteps + step;
    return step > 1 ? stepWithStory - callToActionMode : stepWithStory;
};
