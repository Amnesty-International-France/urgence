import React from 'react';
import RichTextInput from 'ra-input-rich-text';

const toolbar = [[{ size: ['small', 'normal', 'large'] }, 'bold', 'italic', 'underline', 'link']];

export default props => <RichTextInput toolbar={toolbar} {...props} />;
