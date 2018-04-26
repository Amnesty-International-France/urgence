import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import {
    TextInput,
    ImageInput,
    ImageField
} from 'react-admin';
import { withStyles } from 'material-ui/styles';
import { ImagePreview } from '../form/ImagePreview';

const styles = {
    root: {
        display: 'flex',
    },
    titleWrapper: {
        flex: '1 0 0',
    },
    imageWrapper: {
        flex: '1 0 0',
    },
};

export const MediumInput = ({ classes, source }) => (
    <div className={classes.root}>
        <label>medium</label>
        <div className={classes.titleWrapper}>
            <TextInput source="title" label="Medium title" /><br />
        </div>
        <div className={classes.imageWrapper}>
            <ImageInput source="src" label="File">
                <ImagePreview />
            </ImageInput>
        </div>
    </div>
);

MediumInput.propTypes = {
    classes: PropTypes.object,
    source: PropTypes.string.isRequired,
};

export default withStyles(styles)(MediumInput);
