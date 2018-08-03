export const STORY = 0;
export const CALL_TO_ACTION = 1;
export const MESSAGE = 2;
export const OBJECT = 3;
export const FULLNAME = 4;
export const CONTINUE = 5;
export const ADDRESS = 6;
export const MAIL = 7;
export const THANKS = 8;

export const get = (step, formData, storyIndex = 0) => {
    const storySteps = formData && formData.story ? formData.story.length : 0;
    return storySteps + step + storyIndex;
};