import React from 'react';
import PropTypes from 'prop-types';

import { Labeled, required as originalRequired } from 'react-admin';
import { default as BaseRichTextInput } from 'ra-input-rich-text';

const toolbarOptions = [
    [{ size: ['small', false, 'large', 'huge'] }, 'bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }],
    ['link'],
];

const stripHTML = text => (text ? text.replace(/<.*?>/g, '') : text);

const required = (value, ...rest) =>
    originalRequired()(stripHTML(value) ? value : undefined, ...rest);

export const RichTextInput = ({ label, isRequired, ...rest }) => (
    <Labeled label={label}>
        <BaseRichTextInput toolbar={toolbarOptions} validate={isRequired && required} {...rest} />
    </Labeled>
);

RichTextInput.propTypes = {
    label: PropTypes.string.isRequired,
};

export default RichTextInput;
