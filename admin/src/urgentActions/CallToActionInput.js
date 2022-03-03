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
    BooleanInput,
    Labeled,
    NumberInput,
    RadioButtonGroupInput,
} from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import { root, actScreenPreview } from './styles';
import { get as getScreenIndex, CALL_TO_ACTION } from './screenIndex';
import RichTextInput from '../form/RichTextInput';
import FrontPreview, { noop } from './FrontPreview';

import Act from '../../../front/src/urgentActions/Act';
import Link from '../../../front/src/themes/Link';

const styles = {
    ...root,
    preview: {
        ...actScreenPreview,
    },
};

const isSocialMediaAction = (record, source) => {
    return (
        record &&
        record[source] &&
        record[source].interpelation_mode &&
        record[source].interpelation_mode === 'rs'
    );
};

export const CallToActionInput = ({ classes, source }) => (
    <div className={classes.root}>
        <FormDataConsumer>
            {({ formData }) => {
                if (!isSocialMediaAction(formData, source)) {
                    if (formData && formData['call_to_action']) {
                        formData['call_to_action']['interpelation_mode'] = 'email';
                    }
                }
                return (
                    <Fragment>
                        <Avatar className={classes.avatar}>
                            {getScreenIndex(CALL_TO_ACTION, formData)}
                        </Avatar>
                        <Card className={classes.card}>
                            <CardContent className={classes.content}>
                                <div className={classes.formContainer}>
                                    <RadioButtonGroupInput
                                        source={`${source}.interpelation_mode`}
                                        label="Mode d'interpelation"
                                        defaultValue="email"
                                        choices={[
                                            { id: 'email', name: 'Email' },
                                            { id: 'rs', name: 'Réseaux sociaux' },
                                        ]}
                                    />
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
                                    {!isSocialMediaAction(formData, source) && (
                                        <TextInput
                                            source={`${source}.button`}
                                            label="Button"
                                            defaultValue="Voir l'email"
                                            validate={[required(), minLength(3), maxLength(25)]}
                                        />
                                    )}
                                    <Labeled label="Progress">
                                        <Fragment>
                                            <BooleanInput
                                                label="Display progress"
                                                source={`${source}.progress.display`}
                                            />
                                            <NumberInput
                                                label="Objective"
                                                source={`${source}.progress.objective`}
                                                step={1}
                                                defaultValue={500}
                                            />
                                            <NumberInput
                                                label="Display threshold"
                                                source={`${source}.progress.display_threshold`}
                                                step={1}
                                                defaultValue={5}
                                            />
                                            <RichTextInput
                                                source={`${source}.progress.message`}
                                                label="Message"
                                                defaultValue="Déjà {{count}} participations sur un objectif de {{objective}}"
                                                helperText="Déjà {{count}} participations sur un objectif de {{objective}}"
                                            />
                                        </Fragment>
                                    </Labeled>

                                    {isSocialMediaAction(formData, source) && (
                                        <Labeled label="Twitter Sharing">
                                            <Fragment>
                                                <LongTextInput
                                                    source={`${source}.twitter_action.title`}
                                                    label="title"
                                                    defaultValue="Action Urgente"
                                                />
                                                <LongTextInput
                                                    source={`${source}.twitter_action.message`}
                                                    label="Message"
                                                    defaultValue="@cible - respectez les droits humains !"
                                                    helperText="@cible est le nom de l'organisation"
                                                />
                                                <TextInput
                                                    source={`${source}.twitter_action.hashtags`}
                                                    label="Hashtags"
                                                    defaultValue="actionurgente,amnesty"
                                                    helperText="Séparer les hashtags par des virgules"
                                                />
                                                <TextInput
                                                    source={`${source}.twitter_action.url`}
                                                    label="Url"
                                                    defaultValue="https://www.amnesty.fr/action-urgente"
                                                    helperText="Url de l'action"
                                                />
                                            </Fragment>
                                        </Labeled>
                                    )}
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
                );
            }}
        </FormDataConsumer>
    </div>
);

CallToActionInput.propTypes = {
    classes: PropTypes.object,
    source: PropTypes.string,
};

export default addField(withStyles(styles)(CallToActionInput));
