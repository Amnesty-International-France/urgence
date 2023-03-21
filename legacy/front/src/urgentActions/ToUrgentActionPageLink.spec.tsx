import React from 'react';
import { shallow } from 'enzyme';

import { ToUrgentActionPageLink } from './ToUrgentActionPageLink';
import generateUrl from '../services/generateUrl';
import Link from '../themes/Link';

jest.mock('../services/generateUrl');

describe('<ToUrgentActionPageLink />', () => {
    const defaultProps = {
        label: 'label',
        pageName: 'story',
        disabled: false,
        onClick: () => null,
        match: {
            params: {
                slug: 'you-are-my-only-hope',
            },
        },
    };

    beforeEach(() => {
        (generateUrl as any).mockReturnValue('generatedUrl');
    });

    it('should render Link with correct props', () => {
        const wrapper = shallow(<ToUrgentActionPageLink {...defaultProps} />);

        const link = wrapper.find(Link);

        expect(link.prop('label')).toBe('label');
        expect(link.prop('disabled')).toBe(false);
        expect(link.prop('onClick')).toBe(defaultProps.onClick);
        expect(link.prop('to')).toBe('generatedUrl');
    });
});
