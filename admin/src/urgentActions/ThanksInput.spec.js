import React from 'react';
import { shallow } from 'enzyme';
import { FormDataConsumer } from 'react-admin';

import { ThanksInput } from './ThanksInput';

describe('<ThanksInput />', () => {
    const defaultProps = {
        classes: {},
        source: 'letter_thank',
    };

    const defaultRenderPropArgs = {
        formData: {
            letter_thank: {},
        },
    };

    it('should set title by default to "Merci pour votre action."', () => {
        const props = { ...defaultProps };
        const wrapper = shallow(<ThanksInput {...props} final />)
            .find(FormDataConsumer)
            .prop('children');

        expect(
            wrapper(defaultRenderPropArgs)()
                .find('[label="Title"]')
                .prop('defaultValue'),
        ).toBe('Merci pour votre action.');
    });
});
