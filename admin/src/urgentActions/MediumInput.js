import React from 'react';
import PropTypes from 'prop-types';
import {
    TextInput,
    ImageInput,
    Labeled,
} from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import get from 'lodash.get';

import { ImagePreview } from '../form/ImagePreview';

const styles = {
    imageWrapper: {
        position: 'relative',
        '& > div': {
            margin: 0,
            '& > label': {
                display: 'none',
            },
        },
        '& .previews' : {
            position: 'absolute',
            top: 74,
            textAlign: 'center',
            left: 15,
            right: 15,
            '& > div': {
                float: 'none',
            },
            '& img': {
                maxHeight: '9rem',
            },
        }
    },
    dropZone: {
        height: 200,
    },
};

export const validateMedium = (value, record, _, key) => {
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

export const MediumInput = ({ label, classes, source, record }) => (
    <Labeled label={label || "Medium"}>
        <div className={classes.root}>
            <div className={classes.imageWrapper}>
                <ImageInput
                    source={`${source}.src`} 
                    record={record}
                    label=""
                    validate={validateMedium}  
                    classes={{
                        dropZone: classes.dropZone,
                    }}>
                    <ImagePreview/>
                </ImageInput>
            </div>
            <div className={classes.titleWrapper}>
                <TextInput validate={validateMedium} fullWidth source={`${source}.title`} label="Alternate text" /><br/>
            </div>
        </div>
    </Labeled>
);

MediumInput.propTypes = {
    classes: PropTypes.object,
    source: PropTypes.string.isRequired,
};

export default withStyles(styles)(MediumInput);
