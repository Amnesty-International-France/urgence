import React from 'react';
import PropTypes from 'prop-types';

import { addField, LongTextInput } from 'react-admin';

export const ParagraphTemplateInput = ({ source }) => (
    <LongTextInput source={`${source}value`} label="Content" />
);

ParagraphTemplateInput.propTypes = {
    source: PropTypes.string.isRequired,
};

export default addField(ParagraphTemplateInput);
