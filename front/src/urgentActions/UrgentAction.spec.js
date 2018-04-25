import { render } from './UrgentAction';

describe.only('<UrgentActions />', () => {
    describe('render', () => {
        const defaultProps = {};

        it('should display story', () => {
            const props = { ...defaultProps };
            const wrapper = render(props);
            console.log(wrapper);
        });
    });
});
