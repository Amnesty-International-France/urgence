import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { FormDataConsumer, LongTextInput, TextInput, BooleanInput } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
};

const disableSharing = (record, source) => {
    return (
        !record || !record[source] || !record[source].share || !record[source].share.active_twitter
    );
};

const defaultTitle = 'Interpeller la cible sur Twitter';
const defaultTweet = `@cible, respectez les droits humains !`;

export const ShareInput = ({ classes, source }) => {
    return (
        <div className={classes.root}>
            <FormDataConsumer>
                {({ formData }) => {
                    return (
                        <Fragment>
                            <BooleanInput
                                source={`${source}.share.active_twitter`}
                                defaultValue={true}
                                label="Activate sharing"
                            />
                            {!disableSharing(formData, source) && (
                                <TextInput
                                    source={`${source}.share.twitter_title`}
                                    label="Tweet title"
                                    defaultValue={defaultTitle}
                                    disabled={disableSharing(formData, source)}
                                />
                            )}
                            {!disableSharing(formData, source) && (
                                <LongTextInput
                                    source={`${source}.share.twitter_message`}
                                    label="Tweet message"
                                    defaultValue={defaultTweet}
                                    rows="2"
                                    rowsMax="10"
                                    disabled={disableSharing(formData, source)}
                                />
                            )}
                        </Fragment>
                    );
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
