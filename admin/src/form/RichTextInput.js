import React from 'react';
import PropTypes from 'prop-types';

import { Labeled } from 'react-admin';
import { default as BaseRichTextInput } from 'ra-input-rich-text';

const toolbarOptions = [
    [{ size: ['normal', 'large', 'huge']}, 'bold', 'italic']
];

export const RichTextInput = ({ label, ...rest }) => (
    <Labeled label={label}>
        <BaseRichTextInput
            toolbar={toolbarOptions}
            {...rest}
        />
    </Labeled>
);

RichTextInput.propTypes = {
    label: PropTypes.string.isRequired,
};

export default RichTextInput;
