import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Visibility from '@material-ui/icons/Visibility';
import { generateAppUrl } from '../generateUrl';

export const PreviewLink = ({ record: { id, story } }) => (
    <Button
        color="primary"
        href={generateAppUrl('urgentAction', { id })}
        disabled={!story || story.length === 0}
    >
        <Visibility />&nbsp;
        View
    </Button>
);

PreviewLink.propTypes = {
    record: PropTypes.shape({
        id: PropTypes.string.isRequired,
        story: PropTypes.arrayOf(PropTypes.object),
    }),
};

export default PreviewLink;
