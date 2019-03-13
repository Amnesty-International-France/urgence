import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { addField, FormDataConsumer, TextInput } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import { root, transitionScreenPreview } from './styles';
import { get as getScreenIndex, CONTINUE, THANKS } from './screenIndex';
import RichTextInput from '../form/RichTextInput';
import FrontPreview, { noop } from './FrontPreview';

import Thanks from '../../../front/src/urgentActions/Thanks';
import Link from '../../../front/src/themes/Link';
import LinkInput from './LinkInput';

const styles = {
    ...root,
    preview: {
        ...transitionScreenPreview,
    },
};

export const ThanksInput = ({ classes, source, withLink, final }) => (
    <div className={classes.root}>
        <FormDataConsumer>
            {({ formData }) => (
                <Fragment>
                    <Avatar className={classes.avatar}>
                        {getScreenIndex(final ? THANKS : CONTINUE, formData)}
                    </Avatar>
                    <Card className={classes.card}>
                        <CardContent className={classes.content}>
                            <div className={classes.formContainer}>
                                <TextInput
                                    source={`${source}.title`}
                                    label="Title"
                                    defaultValue="Merci de votre soutien !"
                                />
                                <RichTextInput source={`${source}.text`} label="Text" />
                                <TextInput source={`${source}.button`} label="Button" />
                                {!final && withLink && <LinkInput source={`${source}.link`} />}
                            </div>
                        </CardContent>
                    </Card>
                    <FrontPreview className={classes.preview}>
                        <Thanks
                            data={formData[source]}
                            actions={() =>
                                final ? null : (
                                    <Link to="#" label={formData[source].button} onClick={noop} />
                                )
                            }
                        />
                    </FrontPreview>
                </Fragment>
            )}
        </FormDataConsumer>
    </div>
);

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
