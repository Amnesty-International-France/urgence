import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import { ToUrgentActionPageLink } from './ToUrgentActionPageLink';
import generateUrl from '../services/generateUrl';
// @ts-expect-error TS(6142): Module '../themes/Link' was resolved to '/home/gui... Remove this comment to see the full error message
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
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        const wrapper = shallow(<ToUrgentActionPageLink {...defaultProps} />);

        const link = wrapper.find(Link);

        expect(link.prop('label')).toBe('label');
        expect(link.prop('disabled')).toBe(false);
        expect(link.prop('onClick')).toBe(defaultProps.onClick);
        expect(link.prop('to')).toBe('generatedUrl');
    });
});
