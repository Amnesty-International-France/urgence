import React from 'react';
import { action } from '@storybook/addon-actions';
import { Router } from 'react-router-dom';
import createMemoryHistory from 'history/createMemoryHistory'

export const history = createMemoryHistory()
history.push = action('history.push')
history.replace = action('history.replace')
history.go = action('history.go')
history.goBack = action('history.goBack')
history.goForward = action('history.goForward')

export const routerDecorator = story => (
    <Router
        history={history}
    >
        {story()}
    </Router>
);
