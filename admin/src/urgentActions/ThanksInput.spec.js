import React from 'react';
import { shallow } from 'enzyme';
import { FormDataConsumer } from 'react-admin';

import { ThanksInput } from './ThanksInput';

describe('<ThanksInput />', () => {
    const defaultProps = {
        classes: {},
        source: 'call_to_action',
    };

    const defaultRenderPropArgs = {
        call_to_action: {},
    };

    it('should set title by default to "Merci de votre soutien !"', () => {
        const props = { ...defaultProps };
        const renderProp = shallow(<ThanksInput {...props} />)
            .find(FormDataConsumer)
            .prop('children');

        const symbol = renderProp({ ...defaultRenderPropArgs });
        const wrapper = shallow(<symbol {...symbol.props} />);

        expect(wrapper.find('[label="Title"]').prop('defaultValue')).toBe(
            'Merci de votre soutien !',
        );
    });
});
