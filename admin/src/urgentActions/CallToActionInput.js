import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { addField, FormDataConsumer, TextInput } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import { root, preview } from './styles';
import FrontPreview, { noop } from './FrontPreview';
import RichTextInput from '../form/RichTextInput';
import { get as getScreenIndex, CALL_TO_ACTION } from './screenIndex';

import Act from '../../../front/src/urgentActions/Act';
import Link from '../../../front/src/themes/Link';
import LinkInput from './LinkInput';

const styles = {
    ...root,
    preview: {
        ...preview,
        // the rules below override desktop media queries so that the preview is forced to appear like on mobile
        '& > div': {
            padding: '0 !important',
            '& a': {
                alignSelf: 'auto',
            },
        },
    },
};

export const CallToActionInput = ({ classes, source, withLink }) => (
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
                                <TextInput source={`${source}.title`} label="Title" />
                                <RichTextInput source={`${source}.message`} label="Message" />
                                <TextInput source={`${source}.button`} label="Button" />
                                {withLink && <LinkInput source={`${source}.link`} />}
                            </div>
                        </CardContent>
                    </Card>
                    <FrontPreview className={classes.preview}>
                        <Act
                            callToAction={formData.call_to_action}
                            action={
                                <Link
                                    to="#"
                                    label={formData.call_to_action.button}
                                    onClick={noop}
                                />
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
    withLink: PropTypes.bool,
};

CallToActionInput.defaultProps = {
    source: '',
    withLink: false,
};

export default addField(withStyles(styles)(CallToActionInput));
