import React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';

import getApolloClientMock from '../testUtils/getApolloClientMock';

describe('App', () => {
    let client: any;

    beforeAll(() => {
        client = getApolloClientMock();
    });

    it('should render without crashing', () => {
        const rendered = shallow(<App client={client} />);
        expect(rendered).toBeTruthy();
    });

    it('should change the root class', () => {
        global.document = {
            // @ts-expect-error TS(2322): Type '() => void' is not assignable to type '(elem... Remove this comment to see the full error message
            getElementById: () => {},
        };

        // @ts-expect-error TS(2345): Argument of type '() => { className: string; }' is... Remove this comment to see the full error message
        jest.spyOn(global.document, 'getElementById').mockImplementation(() => ({
            className: 'loading',
        }));

        mount(<App client={client} />);

        expect(global.document.getElementById).toHaveBeenCalled();
    });
});
