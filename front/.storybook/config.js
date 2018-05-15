import { configure } from '@storybook/react';

function loadStories() {
    require('../src/icons/stories');
    require('../src/themes/stories');
    require('../src/urgentActions/stories');
}

configure(loadStories, module);
