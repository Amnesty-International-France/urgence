import React from 'react';
import { shallow } from 'enzyme';
import { FormDataConsumer } from 'react-admin';

import { ThanksInput } from './ThanksInput';

describe('<ThanksInput />', () => {
    const defaultProps = {
        classes: {},
        source: 'end_thank',
    };

    const defaultRenderPropArgs = {
        formData: {
            end_thank: {},
        },
    };

    it('should set title by default to "Bienvenue !"', () => {
        const props = { ...defaultProps };
        const renderProp = shallow(<ThanksInput {...props} final />)
            .find(FormDataConsumer)
            .prop('children');

        const symbol = renderProp({ ...defaultRenderPropArgs });
        const wrapper = shallow(<symbol {...symbol.props} />);

        expect(wrapper.find('[label="Title"]').prop('defaultValue')).toBe(
            'Bienvenue !',
        );
    });
});
