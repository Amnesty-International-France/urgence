import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { mount } from 'enzyme';

// @ts-expect-error TS(6142): Module './DataContext' was resolved to '/home/guil... Remove this comment to see the full error message
import { DataProvider, DataConsumer } from './DataContext';
import data from './data';

jest.mock('./data');

describe('DataContext', () => {
    beforeEach(() => {
        (data.getMailObject as any).mockImplementation(() => 'object value');
        (data.getCivility as any).mockImplementation(() => 'civility value');
        (data.getFirstname as any).mockImplementation(() => 'firstname value');
        (data.getLastname as any).mockImplementation(() => 'lastname value');
        (data.getAddressMain as any).mockImplementation(() => 'addressMain value');
        (data.getAddressMore as any).mockImplementation(() => 'addressMore value');
        (data.getPostalCode as any).mockImplementation(() => 'postalCode value');
        (data.getCity as any).mockImplementation(() => 'city value');
        (data.getCountry as any).mockImplementation(() => 'country value');
        (data.getPhone as any).mockImplementation(() => 'phone value');
        (data.getEmail as any).mockImplementation(() => 'email value');
        (data.getRegistered as any).mockImplementation(() => 'false');
    });

    it('should initialize the context from data', () => {
        let contextTest = null;

        const render = (context: any) => {
            contextTest = { ...context };
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <span>OK</span>;
        };
        mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <DataProvider>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        // @ts-expect-error TS(2531): Object is possibly 'null'.
        expect(contextTest.object).toEqual('object value');
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        expect(contextTest.civility).toEqual('civility value');
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        expect(contextTest.firstname).toEqual('firstname value');
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        expect(contextTest.lastname).toEqual('lastname value');
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        expect(contextTest.addressMain).toEqual('addressMain value');
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        expect(contextTest.addressMore).toEqual('addressMore value');
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        expect(contextTest.postalCode).toEqual('postalCode value');
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        expect(contextTest.city).toEqual('city value');
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        expect(contextTest.country).toEqual('country value');
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        expect(contextTest.phone).toEqual('phone value');
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        expect(contextTest.email).toEqual('email value');
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        expect(contextTest.registered).toEqual('false');
    });

    it('should have a "setObject" method to change the state "object"', () => {
        const render = (context: any) => {
            context.setObject('new object');
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <span>OK</span>;
        };
        mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <DataProvider>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setMailObject).toBeCalledWith('new object');
    });

    it('should have a "setCivility" method to change the state "civility"', () => {
        const render = (context: any) => {
            context.setCivility('new civility');
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <span>OK</span>;
        };
        mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <DataProvider>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setCivility).toBeCalledWith('new civility');
    });

    it('should have a "setFirstname" method to change the state "firstname"', () => {
        const render = (context: any) => {
            context.setFirstname('new firstname');
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <span>OK</span>;
        };
        mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <DataProvider>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setFirstname).toBeCalledWith('new firstname');
    });

    it('should have a "setLastname" method to change the state "lastname"', () => {
        const render = (context: any) => {
            context.setLastname('new lastname');
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <span>OK</span>;
        };
        mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <DataProvider>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setLastname).toBeCalledWith('new lastname');
    });

    it('should have a "setAddressMain" method to change the state "addressMain"', () => {
        const render = (context: any) => {
            context.setAddressMain('new addressMain');
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <span>OK</span>;
        };
        mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <DataProvider>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setAddressMain).toBeCalledWith('new addressMain');
    });

    it('should have a "setAddressMore" method to change the state "addressMore"', () => {
        const render = (context: any) => {
            context.setAddressMore('new addressMore');
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <span>OK</span>;
        };
        mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <DataProvider>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setAddressMore).toBeCalledWith('new addressMore');
    });

    it('should have a "setPostalCode" method to change the state "postalCode"', () => {
        const render = (context: any) => {
            context.setPostalCode('new postalCode');
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <span>OK</span>;
        };
        mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <DataProvider>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setPostalCode).toBeCalledWith('new postalCode');
    });

    it('should have a "setCity" method to change the state "city"', () => {
        const render = (context: any) => {
            context.setCity('new city');
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <span>OK</span>;
        };
        mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <DataProvider>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setCity).toBeCalledWith('new city');
    });

    it('should have a "setCountry" method to change the state "country"', () => {
        const render = (context: any) => {
            context.setCountry('new country');
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <span>OK</span>;
        };
        mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <DataProvider>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setCountry).toBeCalledWith('new country');
    });

    it('should have a "setPhone" method to change the state "phone"', () => {
        const render = (context: any) => {
            context.setPhone('new phone');
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <span>OK</span>;
        };
        mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <DataProvider>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setPhone).toBeCalledWith('new phone');
    });

    it('should have a "setEmail" method to change the state "email"', () => {
        const render = (context: any) => {
            context.setEmail('new email');
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <span>OK</span>;
        };
        mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <DataProvider>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setEmail).toBeCalledWith('new email');
    });

    it('should have a "setRegistered" method to change the state "registered"', () => {
        const render = (context: any) => {
            context.setRegistered('true');
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <span>OK</span>;
        };
        mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <DataProvider>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setRegistered).toBeCalledWith('true');
    });

    it('should have a "setRegistered" method with a default param to change the state "registered"', () => {
        const render = (context: any) => {
            context.setRegistered();
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <span>OK</span>;
        };
        mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <DataProvider>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <DataConsumer>{render}</DataConsumer>
            </DataProvider>,
        );

        expect(data.setRegistered).toBeCalledWith('false');
    });
});
