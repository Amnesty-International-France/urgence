import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
    FormDataConsumer,
    LongTextInput,
    BooleanInput,
} from 'react-admin';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        display: 'flex', flexDirection: 'column',
    },
};

const disableSharing = (record, source) => {
    return !record || !record[source] || !record[source].share || !record[source].share.active;
}

export const ShareInput = ({ classes, source }) => {
    const defaultValue = `J'ai agi avec #AmnestyFrance
https://www.amnesty.fr/agir-face-a-lurgence`;

    return (
        <div className={classes.root}>
            <FormDataConsumer>
                {({ formData }) => {
                    return (<Fragment>
                        <BooleanInput
                            source={`${source}.share.active`}
                            defaultValue={true}
                            label='Activate sharing'
                        />
                        {!disableSharing(formData, source) && <LongTextInput
                            source={`${source}.share.message`}
                            label="Tweet message"
                            defaultValue={defaultValue}
                            rows="2"
                            rowsMax="10"
                            disabled={disableSharing(formData, source)}
                        />}
                    </Fragment>)
                }}
            </FormDataConsumer>
        </div>
    );
};

ShareInput.propTypes = {
    classes: PropTypes.object,
    source: PropTypes.string,
};

export default withStyles(styles)(ShareInput);
