import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Email from '@material-ui/icons/Email';
import { generateAppUrl } from '../generateUrl';

const hasMessageTemplate = record => record.message_template && record.message_template.length > 0;

export const PreviewLetter = ({ record }) =>
    !record ? null : (
        <Button
            color="primary"
            href={generateAppUrl('urgentActionLetter', { id: record.id })}
            target="_blank"
            rel="noopener noreferrer"
            disabled={!hasMessageTemplate(record)}
        >
            <Email />&nbsp; Letter
        </Button>
    );

PreviewLetter.propTypes = {
    record: PropTypes.shape({
        id: PropTypes.string.isRequired,
        story: PropTypes.arrayOf(PropTypes.object),
    }),
};

export default PreviewLetter;
