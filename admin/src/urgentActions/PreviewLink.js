import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Visibility from '@material-ui/icons/Visibility';
import { generateAppUrl } from '../generateUrl';

const hasStory = record => record.story && record.story.length > 0;

export const PreviewLink = ({ record }) => !record ? null : (
    <Button
        color="primary"
        href={generateAppUrl('urgentAction', { id: record.id })}
        disabled={!hasStory(record)}
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
