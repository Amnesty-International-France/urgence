import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
    addField,
    FormDataConsumer,
    ReferenceInput,
    LongTextInput,
    TextInput,
    SelectInput,
    required,
} from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import { root, registerFormScreenPreview } from './styles';
import { get as getScreenIndex, REGISTER } from './screenIndex';
import FrontPreview, { noop } from './FrontPreview';

import RegisterActivist from '../../../front/src/urgentActions/register/RegisterActivist';
import Link from '../../../front/src/themes/Link';

const styles = {
    ...root,
    preview: {
        ...registerFormScreenPreview,
    },
};

export const RegisterInput = ({ classes, source }) => {
    const defaultMessage = `L'expérience vous a plu ? Inscrivez-vous pour recevoir les actions urgentes suivantes !`;
    const defaultButton = `Je m'inscris`;

    return (
        <div className={classes.root}>
            <FormDataConsumer>
                {({ formData }) => (
                    <Fragment>
                        <Avatar className={classes.avatar}>
                            {getScreenIndex(REGISTER, formData)}
                        </Avatar>
                        <Card className={classes.card}>
                            <CardContent className={classes.content}>
                                <div className={classes.formContainer}>
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
                                    <ReferenceInput
                                        fullWidth
                                        label="Legal Information | GDPR"
                                        source={`${source}gdpr`}
                                        reference="Settings"
                                        allowEmpty
                                    >
                                        <SelectInput optionText="type" />
                                    </ReferenceInput>
                                </div>
                            </CardContent>
                        </Card>
                        <FrontPreview className={classes.preview}>
                            <RegisterActivist
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
