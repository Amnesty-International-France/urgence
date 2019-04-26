import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
    addField,
    FormDataConsumer,
} from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import { root, registerFormScreenPreview } from './styles';
import { get as getScreenIndex, REGISTER } from './screenIndex';
import FrontPreview, { noop } from './FrontPreview';

import Register from '../../../front/src/urgentActions/register/RegisterActivist';
import Link from '../../../front/src/themes/Link';

const styles = {
    ...root,
    preview: {
        ...registerFormScreenPreview,
    },
};

export const ThanksInput = ({ classes, source, withLink, final }) => {
    const defaultValue = `L'expérience vous a plu ? Inscrivez-vous pour recevoir les actions urgentes suivantes !`;

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
                                {defaultValue}
                            </CardContent>
                        </Card>
                        <FrontPreview className={classes.preview}>
                            <Register
                                action={<Link
                                    to="#"
                                    label="Je m'inscris"
                                    onClick={noop}
                                />}
                            />
                        </FrontPreview>
                    </Fragment>
                )}
            </FormDataConsumer>
        </div>
    );
};

ThanksInput.propTypes = {
    classes: PropTypes.object,
    source: PropTypes.string,
    withLink: PropTypes.bool,
    final: PropTypes.bool,
};

ThanksInput.defaultProps = {
    final: false,
    withLink: false,
};

export default addField(withStyles(styles)(ThanksInput));
