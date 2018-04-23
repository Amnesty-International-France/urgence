import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';

import getApolloClientMock from './testUtils/getApolloClientMock';

describe('App', () => {
    let client;

    beforeAll(() => {
        client = getApolloClientMock();
    });

    it('renders without crashing', () => {
        const rendered = renderer.create(<App client={client} />).toJSON();
        expect(rendered).toBeTruthy();
    });
});
