import React from 'react';
import PropTypes from 'prop-types';
import {
    TextInput,
    ImageInput,
} from 'react-admin';
import { withStyles } from 'material-ui/styles';
import get from 'lodash.get';

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

export const validateMedium = (value, record, _, key) => {
    console.log({ value, record, key });
    const mediumKey = key.split('.').slice(0, -1).join('.');
    const titleKey = `${mediumKey}.title`;
    const srcKey = `${mediumKey}.src`;
    const title = get(record, titleKey);
    const src = get(record, srcKey);
    if ((title && src) || (!title && !src)) {
        return undefined;
    }
    return 'You need to specify both src and title for medium or none of them';
};

export const MediumInput = ({ classes, source, record }) => (
    <div className={classes.root}>
        <label>medium</label>
        <div className={classes.titleWrapper}>
            <TextInput validate={validateMedium} source={`${source}.title`} label="Medium title" /><br />
        </div>
        <div className={classes.imageWrapper}>
            <ImageInput validate={validateMedium} record={record} source={`${source}.src`} label="File">
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
