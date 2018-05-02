import React from 'react';
import PropTypes from 'prop-types';

import { addField } from 'react-admin';
import { RichTextInput } from '../form/RichTextInput';


export const ParagraphTemplateInput = ({ source }) => (
    <RichTextInput source={`${source}value`} label="Content" />
);

ParagraphTemplateInput.propTypes = {
    source: PropTypes.string.isRequired,
};

export default addField(ParagraphTemplateInput);
