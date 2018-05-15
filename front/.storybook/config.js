import { configure } from '@storybook/react';

function loadStories() {
    require('../src/icons/stories');
    require('../src/stories');
}

configure(loadStories, module);
