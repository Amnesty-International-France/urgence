import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
    FormDataConsumer,
    LongTextInput,
    TextInput,
    BooleanInput,
} from 'react-admin';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        display: 'flex', flexDirection: 'column',
    },
};

const disableSharing = (record, source) => {
    return !record || !record[source] || !record[source].share || !record[source].share.active_twitter;
}

export const ShareInput = ({ classes, source }) => {

    const defaultTitle = 'Interpeller la cible sur Twitter';

    const defaultTweet = `Arrétez d'être méchant @cible`;

    const defaultValue = `J'ai agi avec AmnestyFrance
${process.env.REACT_APP_FRONT_BASE_URL}/#/ua/$CURRENT_AU_ID`;


    return (
        <div className={classes.root}>
            <FormDataConsumer>
                {({ formData }) => {
                    return (<Fragment>
                        <BooleanInput
                            source={`${source}.share.active_twitter`}
                            defaultValue={true}
                            label='Activate sharing'
                        />
                        {!disableSharing(formData, source) && <TextInput
                            source={`${source}.share.twitter_title`}
                            label="Tweet title"
                            defaultValue={defaultTitle}
                            disabled={disableSharing(formData, source)}
                        />}
                        {!disableSharing(formData, source) && <LongTextInput
                            source={`${source}.share.twitter_message`}
                            label="Tweet message"
                            defaultValue={defaultTweet}
                            rows="2"
                            rowsMax="10"
                            disabled={disableSharing(formData, source)}
                        />}
                        <LongTextInput
                            source={`${source}.share.message`}
                            label="Sharing message"
                            defaultValue={defaultValue}
                            rows="2"
                            rowsMax="10"
                        />

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
