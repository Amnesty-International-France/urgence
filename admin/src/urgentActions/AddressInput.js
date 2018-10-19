import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { addField, FormDataConsumer, Labeled, LongTextInput } from 'react-admin';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { root, preview } from './styles';
import { get as getScreenIndex, ADDRESS } from './screenIndex';
import FrontPreview, { noop } from './FrontPreview';

import AddressStep from '../../../front/src/urgentActions/AddressStep';
import Link from '../../../front/src/themes/Link';

const styles = theme => ({
    ...root,
    bordered: {
        borderBottom: `solid 1px ${theme.palette.divider}`,
    },
    preview: {
        ...preview,
        // the rules below override desktop media queries so that the preview is forced to appear like on mobile
        '& > div': {
            height: preview.height,
            boxSizing: 'border-box',
            '& a': {
                display: 'block',
            },
            '& textarea': {
                boxSizing: 'border-box',
            },
        },
    },
});

export const AddressInput = ({ classes, source }) => (
    <div className={classNames(classes.root, classes.bordered)}>
        <FormDataConsumer>
            {({ formData }) => (
                <Fragment>
                    <Avatar className={classes.avatar}>{getScreenIndex(ADDRESS, formData)}</Avatar>
                    <Card className={classes.card}>
                        <CardContent className={classes.content}>
                            <div className={classes.formContainer}>
                                <Labeled label="Recipient">
                                    <LongTextInput label="Postal Address" source={source} />
                                </Labeled>
                            </div>
                        </CardContent>
                    </Card>
                    <FrontPreview className={classes.preview}>
                        <AddressStep
                            setAddress={noop}
                            address=""
                            action={disabled => (
                                <Link to={'#'} label="Valider" disabled={disabled} />
                            )}
                        />
                    </FrontPreview>
                </Fragment>
            )}
        </FormDataConsumer>
    </div>
);

AddressInput.propTypes = {
    classes: PropTypes.object,
};

export default addField(withStyles(styles)(AddressInput));
