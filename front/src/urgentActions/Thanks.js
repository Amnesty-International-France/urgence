import get from 'lodash.get';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { LinkType } from '../propTypes';
import TransitionScreen from '../themes/TransitionScreen';
import Share from '../themes/Share';

export const Thanks = ({ data, actions }) => {
    const share = get(data, 'share');
    return (
        <Fragment>
            <TransitionScreen
                actions={actions}
                title={get(data, 'title')}
                message={get(data, 'text')}
                link={get(data, 'link.url')}
            />
            {share && share.active && <Share message={share.message} />}
        </Fragment>
    );
};

Thanks.propTypes = {
    actions: PropTypes.func,
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        link: LinkType,
    }),
};

Thanks.defaultProps = {
    actions: () => {},
};

export default Thanks;
