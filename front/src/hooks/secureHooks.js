/* eslint-disable no-console */

import { useState, useEffect } from 'react';

/**
 * React Hooks don't work in admin preview. They result as the following error.
 * Invalid hook call. Hooks can only be called inside of the body of a function component.
 * This could happen for one of the following reasons:
 *      1. You might have mismatching versions of React and the renderer (such as React DOM)
 *      2. You might be breaking the Rules of Hooks
 *      3. You might have more than one copy of React in the same app
 * See https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.
 */

export const secureUseState = (defaultValue) => {
    try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useState(defaultValue);
    } catch (error) {
        console.warn("useState doesn't work through admin preview", error.message);
        return [false, () => true];
    }
};

export const secureUseEffect = (action) => {
    try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useEffect(action);
    } catch (error) {
        console.warn("useEffect doesn't work through admin preview", error.message);
        return [false, () => true];
    }
};
