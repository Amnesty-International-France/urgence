import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

import getApolloClientMock from '../testUtils/getApolloClientMock';

describe('App', () => {
    let client;

    beforeAll(() => {
        client = getApolloClientMock();
    });

    it('should render without crashing', () => {
        const rendered = shallow(<App client={client} />);
        expect(rendered).toBeTruthy();
    });

    it('should change the root class', () => {
        const spy = jest.spyOn(document, 'getElementById');

        shallow(<App client={client} />);

        expect(spy).toHaveBeenCalledWith('root');

        spy.mockRestore();
    });
});
