import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
    addField,
    required,
    FormDataConsumer,
    TextInput,
    LongTextInput,
    BooleanInput,
} from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import { root, sharingScreenPreview } from './styles';
import { get as getScreenIndex, CONTINUE } from './screenIndex';
import RichTextInput from '../form/RichTextInput';
import FrontPreview from './FrontPreview';

import ShareStep from '../../../front/src/urgentActions/ShareStep';

const styles = {
    ...root,
    preview: {
        ...sharingScreenPreview,
    },
};

const disableSharing = (record, source) => {
    return (
        !record || !record[source] || !record[source].share || !record[source].share.active_twitter
    );
};

const defaultTitle = 'Se battre. Encore. Et Encore.';
const defaultText =
    "Continuons d'agir pour augmenter les chances de victoire ! Allons plus loin dans ce combat grace aux réseaux sociaux.";
const defaultTweetTitle = 'Interpeller la cible sur Twitter';
const defaultTweet = `@cible, respectez les droits humains !`;
const defaultMessage = `J'ai agi avec Amnesty France!`;

export const ShareInput = ({ classes, source }) => {
    return (
        <div className={classes.root}>
            <FormDataConsumer>
                {({ formData }) => (
                    <Fragment>
                        <Avatar className={classes.avatar}>
                            {getScreenIndex(CONTINUE, formData)}
                        </Avatar>
                        <Card className={classes.card}>
                            <CardContent className={classes.content}>
                                <div className={classes.formContainer}>
                                    <LongTextInput
                                        source={`${source}.title`}
                                        label="Title"
                                        defaultValue={defaultTitle}
                                        validate={[required()]}
                                    />
                                    <RichTextInput
                                        source={`${source}.text`}
                                        label="Text"
                                        defaultValue={defaultText}
                                        validate={[required()]}
                                    />
                                    <BooleanInput
                                        source={`${source}.share.active_twitter`}
                                        defaultValue={true}
                                        label="Activate twitter"
                                    />
                                    {!disableSharing(formData, source) && (
                                        <TextInput
                                            source={`${source}.share.twitter_title`}
                                            label="Tweet title"
                                            defaultValue={defaultTweetTitle}
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
                                    <LongTextInput
                                        source={`${source}.share.message`}
                                        label="Sharing message"
                                        defaultValue={defaultMessage}
                                        rows="2"
                                        rowsMax="10"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <FrontPreview className={classes.preview}>
                            <ShareStep data={formData[source]} slug={formData.slug} />
                        </FrontPreview>
                    </Fragment>
                )}
            </FormDataConsumer>
        </div>
    );
};

ShareInput.propTypes = {
    classes: PropTypes.object,
    source: PropTypes.string,
};

ShareInput.defaultProps = {};

export default addField(withStyles(styles)(ShareInput));
