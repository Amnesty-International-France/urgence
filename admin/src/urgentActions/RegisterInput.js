import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { addField, FormDataConsumer, LongTextInput, TextInput, required } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import { root, registerFormScreenPreview } from './styles';
import { get as getScreenIndex, REGISTER } from './screenIndex';
import FrontPreview, { noop } from './FrontPreview';

import Register from '../../../front/src/urgentActions/register/Register';
import Link from '../../../front/src/themes/Link';

const styles = () => ({
    ...root,
    preview: {
        ...registerFormScreenPreview,
    },
});

const defaultTitle = 'Merci pour votre action';
const defaultMessage = `L'expérience vous a plu ? Inscrivez-vous pour recevoir les actions urgentes suivantes !`;
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
                                    <LongTextInput
                                        source={`${source}.title`}
                                        label="Title"
                                        defaultValue={defaultTitle}
                                        validate={[required()]}
                                    />
                                    <LongTextInput
                                        source={`${source}.text`}
                                        label="Text"
                                        defaultValue={defaultMessage}
                                        validate={[required()]}
                                    />
                                    <TextInput
                                        source={`${source}.button`}
                                        label="Button"
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
