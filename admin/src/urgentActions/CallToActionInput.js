import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
    addField,
    required,
    minLength,
    maxLength,
    FormDataConsumer,
    LongTextInput,
    TextInput,
} from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import { root, transitionScreenPreview } from './styles';
import { get as getScreenIndex, CALL_TO_ACTION } from './screenIndex';
import RichTextInput from '../form/RichTextInput';
import FrontPreview, { noop } from './FrontPreview';

import Act from '../../../front/src/urgentActions/Act';
import Link from '../../../front/src/themes/Link';

const styles = {
    ...root,
    preview: {
        ...transitionScreenPreview,
    },
};

export const CallToActionInput = ({ classes, source }) => (
    <div className={classes.root}>
        <FormDataConsumer>
            {({ formData }) => (
                <Fragment>
                    <Avatar className={classes.avatar}>
                        {getScreenIndex(CALL_TO_ACTION, formData)}
                    </Avatar>
                    <Card className={classes.card}>
                        <CardContent className={classes.content}>
                            <div className={classes.formContainer}>
                                <LongTextInput
                                    source={`${source}.title`}
                                    label="Title"
                                    defaultValue="Vous avez plus de pouvoir que vous ne le pensez !"
                                    validate={[required()]}
                                    multiline
                                />
                                <RichTextInput
                                    source={`${source}.message`}
                                    label="Message"
                                    defaultValue="Envoyez dès maintenant un e-mail pour interpeller le Responsable du pouvoir judiciaire."
                                    validate={[required()]}
                                />
                                <TextInput
                                    source={`${source}.button`}
                                    label="Button"
                                    defaultValue="Voir l'email"
                                    validate={[required(), minLength(3), maxLength(25)]}
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <FrontPreview className={classes.preview}>
                        <Act
                            data={formData.call_to_action}
                            actions={() =>
                                formData.call_to_action && formData.call_to_action.button ? (
                                    <Link
                                        to="#"
                                        label={formData.call_to_action.button}
                                        onClick={noop}
                                    />
                                ) : null
                            }
                        />
                    </FrontPreview>
                </Fragment>
            )}
        </FormDataConsumer>
    </div>
);

CallToActionInput.propTypes = {
    classes: PropTypes.object,
    source: PropTypes.string,
};

export default addField(withStyles(styles)(CallToActionInput));
