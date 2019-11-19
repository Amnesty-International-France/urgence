import React from 'react';
import RichTextInput from 'ra-input-rich-text';
import { Labeled } from 'react-admin';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const toolbar = [
    [{ size: ['small', 'normal', 'large'] }, 'bold', 'italic', 'underline', 'link'],
    [{ color: [] }, { background: [] }],
];

const styles = {
    fullwidth: {
        width: '100%',
    },
};

const SettingsContentInput = ({ classes, label, ...rest }) => (
    <Labeled label={label} className={classes.fullwidth}>
        <RichTextInput toolbar={toolbar} {...rest} />
    </Labeled>
);

SettingsContentInput.propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
};

SettingsContentInput.defaultProps = {
    classes: {},
    label: 'Content',
};

export default withStyles(styles)(SettingsContentInput);
