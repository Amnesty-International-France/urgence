import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

import getApolloClientMock from '../testUtils/getApolloClientMock';

describe('App', () => {
    let client;

    beforeAll(() => {
        client = getApolloClientMock();
    });

    it('renders without crashing', () => {
        const rendered = shallow(<App client={client} />);
        expect(rendered).toBeTruthy();
    });
});
