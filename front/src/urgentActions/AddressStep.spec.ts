// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import { AddressStep } from './AddressStep';

describe('<AddressStep />', () => {
    const defaultProps = {
        action: () => 'action',
        className: 'class',
        addressMain: 'addressMain value',
        addressMore: 'addressMore value',
        postalCode: 'postalCode value',
        city: 'city value',
        country: 'country value',
        email: 'email value',
        setAddressMain: () => {},
        setAddressMore: () => {},
        setPostalCode: () => {},
        setCity: () => {},
        setCountry: () => {},
        setEmail: () => {},
    };

    it('should put action result inside .action div', () => {
        // @ts-expect-error TS(2352): Conversion of type '{ action: () => string; classN... Remove this comment to see the full error message
        const wrapper = shallow(<AddressStep {...defaultProps} />);
        const action = wrapper.find('.action');
        expect(action.html()).toBe('<div class="action">action</div>');
    });

    it('should call action props with true if object is set', () => {
        const props = {
            ...defaultProps,
            action: jest.fn(),
        };

        // @ts-expect-error TS(2352): Conversion of type '{ action: jest.Mock<any, any>;... Remove this comment to see the full error message
        shallow(<AddressStep {...props} />);
        expect(props.action).toHaveBeenCalledWith(false);
    });

    it('should call action props with true if full adresse is not set', () => {
        const props = {
            ...defaultProps,
            action: jest.fn(),
            addressMain: null,
            addressMore: null,
            postalCode: null,
            city: null,
            country: null,
            email: null,
        };

        // @ts-expect-error TS(2352): Conversion of type '{ action: jest.Mock<any, any>;... Remove this comment to see the full error message
        shallow(<AddressStep {...props} />);
        expect(props.action).toHaveBeenCalledWith(true);
    });

    it('should call action props with false if adresse is set accept adressMore field', () => {
        const props = {
            ...defaultProps,
            action: jest.fn(),
            addressMain: 'my street',
            addressMore: null,
            postalCode: '75001',
            city: 'Paris',
            country: 'France',
            email: 'myemail',
        };

        // @ts-expect-error TS(2352): Conversion of type '{ action: jest.Mock<any, any>;... Remove this comment to see the full error message
        shallow(<AddressStep {...props} />);
        expect(props.action).toHaveBeenCalledWith(false);
    });

    it('should render input with value = context.addressMain and onChange = context.setAddressMain', () => {
        const props = {
            ...defaultProps,
            setAddressMain: jest.fn(),
        };

        // @ts-expect-error TS(2352): Conversion of type '{ setAddressMain: jest.Mock<an... Remove this comment to see the full error message
        const wrapper = shallow(<AddressStep {...props} />);
        const input = wrapper.find('.addressMain');

        expect(input.prop('value')).toBe('addressMain value');
        expect(input.prop('onChange')).toBe(wrapper.instance().setAddressMain);

        wrapper.instance().setAddressMain({ target: { value: 'new value' } });
        expect(props.setAddressMain).toBeCalledWith('new value');
    });

    it('should render input with value = context.addressMore and onChange = context.setAddressMore', () => {
        const props = {
            ...defaultProps,
            setAddressMore: jest.fn(),
        };

        // @ts-expect-error TS(2352): Conversion of type '{ setAddressMore: jest.Mock<an... Remove this comment to see the full error message
        const wrapper = shallow(<AddressStep {...props} />);
        const input = wrapper.find('.addressMore');

        expect(input.prop('value')).toBe('addressMore value');
        expect(input.prop('onChange')).toBe(wrapper.instance().setAddressMore);

        wrapper.instance().setAddressMore({ target: { value: 'new value' } });
        expect(props.setAddressMore).toBeCalledWith('new value');
    });

    it('should render input with value = context.postalCode and onChange = context.setPostalCode', () => {
        const props = {
            ...defaultProps,
            setPostalCode: jest.fn(),
        };

        // @ts-expect-error TS(2352): Conversion of type '{ setPostalCode: jest.Mock<any... Remove this comment to see the full error message
        const wrapper = shallow(<AddressStep {...props} />);
        const input = wrapper.find('.postalCode');

        expect(input.prop('value')).toBe('postalCode value');
        expect(input.prop('onChange')).toBe(wrapper.instance().setPostalCode);

        wrapper.instance().setPostalCode({ target: { value: 'new value' } });
        expect(props.setPostalCode).toBeCalledWith('new value');
    });

    it('should render input with value = context.city and onChange = context.setCity', () => {
        const props = {
            ...defaultProps,
            setCity: jest.fn(),
        };

        // @ts-expect-error TS(2352): Conversion of type '{ setCity: jest.Mock<any, any>... Remove this comment to see the full error message
        const wrapper = shallow(<AddressStep {...props} />);
        const input = wrapper.find('.city');

        expect(input.prop('value')).toBe('city value');
        expect(input.prop('onChange')).toBe(wrapper.instance().setCity);

        wrapper.instance().setCity({ target: { value: 'new value' } });
        expect(props.setCity).toBeCalledWith('new value');
    });

    it('should render input with value = context.country and onChange = context.setCountry', () => {
        const props = {
            ...defaultProps,
            setCountry: jest.fn(),
        };

        // @ts-expect-error TS(2352): Conversion of type '{ setCountry: jest.Mock<any, a... Remove this comment to see the full error message
        const wrapper = shallow(<AddressStep {...props} />);
        const input = wrapper.find('.country');

        expect(input.prop('value')).toBe('country value');
        expect(input.prop('onChange')).toBe(wrapper.instance().setCountry);

        wrapper.instance().setCountry({ target: { value: 'new value' } });
        expect(props.setCountry).toBeCalledWith('new value');
    });

    it('should render input with value = context.email and onChange = context.setEmail', () => {
        const props = {
            ...defaultProps,
            setEmail: jest.fn(),
        };

        // @ts-expect-error TS(2352): Conversion of type '{ setEmail: jest.Mock<any, any... Remove this comment to see the full error message
        const wrapper = shallow(<AddressStep {...props} />);
        const input = wrapper.find('.email');

        expect(input.prop('value')).toBe('email value');
        expect(input.prop('onChange')).toBe(wrapper.instance().setEmail);

        wrapper.instance().setEmail({ target: { value: 'new value' } });
        expect(props.setEmail).toBeCalledWith('new value');
    });
});
