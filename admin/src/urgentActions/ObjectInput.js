import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { addField, FormDataConsumer } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';

import { root, preview } from './styles';
import RichTextInput from '../form/RichTextInput';
import { get as getScreenIndex, OBJECT } from './screenIndex';
import FrontPreview, { noop } from './FrontPreview';

import { ObjectStep } from '../../../front/src/urgentActions/ObjectStep';
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
            backgroundColor: '#fff',
            padding: '105px 2rem 53px !important',
            height: preview.height,
            boxSizing: 'border-box',
            '& .action': {
                alignSelf: 'auto',
                '& a': {
                    display: 'block',
                },
            },
            '& input': {
                boxSizing: 'border-box',
            },
        },
    },
});

export const ObjectInput = ({ classes, source }) => (
    <div className={classNames(classes.root, classes.bordered)}>
        <FormDataConsumer>
            {({ formData }) => (
                <Fragment>
                    <Avatar className={classes.avatar}>{getScreenIndex(OBJECT, formData)}</Avatar>
                    <Card className={classes.card}>
                        <CardContent className={classes.content}>
                            <div className={classes.formContainer}>
                                <RichTextInput
                                    label="Object tip"
                                    source={`${source}object_indication`}
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <FrontPreview className={classes.preview}>
                        <ObjectStep
                            objectIndication={formData.object_indication}
                            setObject={noop}
                            object=""
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

ObjectInput.propTypes = {
    classes: PropTypes.object,
    source: PropTypes.string,
};

ObjectInput.defaultProps = {
    source: '',
};

export default addField(withStyles(styles)(ObjectInput));
