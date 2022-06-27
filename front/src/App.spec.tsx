import React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';

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
        global.document = {
            getElementById: () => {},
        };

        jest.spyOn(global.document, 'getElementById').mockImplementation(() => ({
            className: 'loading',
        }));

        mount(<App client={client} />);

        expect(global.document.getElementById).toHaveBeenCalled();
    });
});
