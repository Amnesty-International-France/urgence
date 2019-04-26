import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
    addField,
    required,
    minLength,
    maxLength,
    FormDataConsumer,
    Labeled,
    LongTextInput,
    TextInput,
} from 'react-admin';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { root, preview, messageFormScreenPreview } from './styles';
import { get as getScreenIndex, ADDRESS } from './screenIndex';
import FrontPreview from './FrontPreview';

import AddressStep from '../../../front/src/urgentActions/AddressStep';
import Link from '../../../front/src/themes/Link';

const styles = theme => ({
    ...root,
    bordered: {
        borderBottom: `solid 1px ${theme.palette.divider}`,
    },
    preview: {
        ...preview,
        ...messageFormScreenPreview,
    },
});

export const LetterInput = ({ classes, source }) => (
    <div className={classNames(classes.root, classes.bordered)}>
        <FormDataConsumer>
            {({ formData }) => (
                <Fragment>
                    <Avatar className={classes.avatar}>{getScreenIndex(ADDRESS, formData)}</Avatar>
                    <Card className={classes.card}>
                        <CardContent className={classes.content}>
                            <div className={classes.formContainer}>
                                <Labeled label="Generate Letter">
                                    <LongTextInput
                                        label="Recipient Postal Address"
                                        rows="6"
                                        source={`${source}.postal_address`}
                                        validate={[required()]}
                                    />
                                </Labeled>
                                <TextInput
                                    source={`${source}.button`}
                                    label="Button"
                                    defaultValue="Recevoir ma lettre"
                                    validate={[required(), minLength(3), maxLength(25)]}
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <FrontPreview className={classes.preview}>
                        <AddressStep
                            action={disabled =>
                                formData.recipient && formData.recipient.button ? (
                                    <Link
                                        to="#"
                                        label={formData.recipient.button}
                                        disabled={disabled}
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

LetterInput.propTypes = {
    classes: PropTypes.object,
};

export default addField(withStyles(styles)(LetterInput));
