import { shallow } from 'enzyme';

import { renderObjectStep } from './ObjectStep';

describe('<ObjectStep />', () => {
    const defaultProps = {
        objectIndication:
            'Indiquez par exemple que vous souhaitez parler de cette situation inacceptable.',
        action: jest.fn().mockReturnValue('action'),
        className: 'class',
    };
    const defaultContext = {
        object: 'object value',
        changeObject: 'changeObject',
    };

    describe('renderOnjectStep', () => {
        it('should display objectIndication as HTML', () => {
            const props = {
                ...defaultProps,
                objectIndication: '<p>hello world</p>',
            };

            const wrapper = shallow(renderObjectStep(props)(defaultContext));
            const richText = wrapper.find('RichText');
            expect(richText.prop('html')).toBe('<p>hello world</p>');
        });

        it('should put action result inside .action div', () => {
            const wrapper = shallow(renderObjectStep(defaultProps)(defaultContext));
            const action = wrapper.find('.action');
            expect(action.html()).toBe('<div class="action">action</div>');
        });

        it('should call action props with true if object is set', () => {
            shallow(renderObjectStep(defaultProps)(defaultContext));
            expect(defaultProps.action).toHaveBeenCalledWith(false);
        });

        it('should call action props with false if object is not set', () => {
            const context = {
                ...defaultContext,
                object: null,
            };
            shallow(renderObjectStep(defaultProps)(context));
            expect(defaultProps.action).toHaveBeenCalledWith(false);
        });

        it('should render input with value = context.object and onChange = context.changeObject', () => {
            const wrapper = shallow(renderObjectStep(defaultProps)(defaultContext));
            const input = wrapper.find('input');
            expect(input.prop('value')).toBe('object value');
            expect(input.prop('onChange')).toBe('changeObject');
        });
    });
});
