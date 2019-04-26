export const STORY = 0;
export const CALL_TO_ACTION = 1;
export const MESSAGE = 2;
export const CONTINUE = 3;
export const ADDRESS = 4;
export const REGISTER = 4;
export const THANKS = 5;

export const get = (step, formData, storyIndex = 0) => {
    const storySteps = formData && formData.story ? formData.story.length : 0;
    return storySteps + step + storyIndex;
};
