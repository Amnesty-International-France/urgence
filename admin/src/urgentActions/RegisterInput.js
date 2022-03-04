import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { addField, FormDataConsumer, TextInput, required } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import { root, registerFormScreenPreview } from './styles';
import { get as getScreenIndex, REGISTER } from './screenIndex';
import FrontPreview, { noop } from './FrontPreview';
import RichTextInput from '../form/RichTextInput';

import Register from '../../../front/src/urgentActions/register/Register';
import Link from '../../../front/src/themes/Link';

const styles = () => ({
    ...root,
    preview: {
        ...registerFormScreenPreview,
    },
});

const defaultTitle = 'Restez Informé·e';
const defaultText = `L'expérience vous a plu ? Inscrivez-vous pour recevoir les actions urgentes suivantes !`;
const defaultPhoneIndication = `Inscrivez votre numéro de mobile pour recevoir les alertes SMS`;
const defaultButton = `Je m'inscris`;

export const RegisterInput = ({ classes, source }) => {
    return (
        <div className={classes.root}>
            <FormDataConsumer>
                {({ formData }) => (
                    <Fragment>
                        <Avatar className={classes.avatar}>
                            {getScreenIndex(REGISTER, formData) + 'B'}
                        </Avatar>
                        <Card className={classes.card}>
                            <CardContent className={classes.content}>
                                <div className={classes.formContainer}>
                                    <RichTextInput
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
                                    <RichTextInput
                                        source={`${source}.phone_indication`}
                                        label="Consignes inscription"
                                        defaultValue={defaultPhoneIndication}
                                    />
                                    <TextInput
                                        source={`${source}.button`}
                                        label="Bouton"
                                        defaultValue={defaultButton}
                                        validate={[required()]}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <FrontPreview className={classes.preview}>
                            <Register
                                autoFocus={false}
                                data={formData[source]}
                                action={() =>
                                    formData[source] && formData[source].button ? (
                                        <Link
                                            to="#"
                                            label={formData[source].button}
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
};

RegisterInput.propTypes = {
    classes: PropTypes.object,
    source: PropTypes.string,
};

export default addField(withStyles(styles)(RegisterInput));
