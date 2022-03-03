export const STORY = 0;
export const CALL_TO_ACTION = 1;
export const MESSAGE_VIEW = 2;
export const MESSAGE_SEND = 2;
export const ADDRESS = 2;
export const REGISTER = 3;
export const SHARE = 3;
export const THANKS = 4;

export const get = (step, formData, storyIndex = 0) => {
    const storySteps = formData && formData.story ? formData.story.length : 0;
    const callToActionMode =
        formData &&
        formData.call_to_action &&
        formData.call_to_action.interpelation_mode === 'email'
            ? 0
            : 1;

    const stepWithStory = storySteps + step + storyIndex;
    return step > 1 ? stepWithStory - callToActionMode : stepWithStory;
};
