import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { addField, FormDataConsumer, TextInput, LongTextInput } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import { root, preview } from './styles';
import { merge } from './defaultFormData';
import { get as getScreenIndex, CONTINUE, THANKS } from './screenIndex';
import FrontPreview from './FrontPreview';

import Thanks from '../../../front/src/urgentActions/Thanks';
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
                                <div>
                                    <TextInput
                                        source={`${source}.title`}
                                        label="Title"
                                        defaultValue="Merci de votre soutien !"
                                    />
                                    <LongTextInput
                                        source={`${source}.text`}
                                        label="Text"
                                        multiline
                                    />
                                    {withLink && <LinkInput source={`${source}.link`} />}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <FrontPreview className={classes.preview}>
                        <Thanks
                            title={merge(formData)[source].title}
                            text={merge(formData)[source].text}
                            actions={() => (final ? null : <Link to={'#'} label="Continuer" />)}
                        />
                    </FrontPreview>
                </Fragment>
            )}
        </FormDataConsumer>
    </div>
);

ThanksInput.propTypes = {
    source: PropTypes.string,
    classes: PropTypes.object,
    withLink: PropTypes.bool,
    final: PropTypes.bool,
};

ThanksInput.defaultProps = {
    source: '',
    final: false,
    withLink: false,
};

export default addField(withStyles(styles)(ThanksInput));
