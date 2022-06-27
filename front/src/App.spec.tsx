import React from 'react';
// @ts-expect-error TS(6142): Module './App' was resolved to '/home/guillaume/de... Remove this comment to see the full error message
import App from './App';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow, mount } from 'enzyme';

// @ts-expect-error TS(7016): Could not find a declaration file for module '../t... Remove this comment to see the full error message
import getApolloClientMock from '../testUtils/getApolloClientMock';

describe('App', () => {
    let client: any;

    beforeAll(() => {
        client = getApolloClientMock();
    });

    it('should render without crashing', () => {
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        mount(<App client={client} />);

        expect(global.document.getElementById).toHaveBeenCalled();
    });
});
