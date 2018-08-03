import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { addField, FormDataConsumer } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import { root, preview } from './styles';
import FrontPreview, { noop } from './FrontPreview';
import RichTextInput from '../form/RichTextInput';
import { get as getScreenIndex, CALL_TO_ACTION} from './screenIndex';

import Act from '../../../front/src/urgentActions/Act';
import Link from '../../../front/src/themes/Link';

const styles = {
    ...root,
    preview: {
        ...preview,
        // the rules below override desktop media queries so that the preview is forced to appear like on mobile
        '& > div': {
            padding: '0 !important',
            '& a': {
                alignSelf: 'auto',
            }
        }
    }
};

export const CallToActionInput = ({ classes, source }) => (
    <div className={classes.root}>
        <FormDataConsumer>
            {({ formData }) =>
                <Fragment>
                    <Avatar className={classes.avatar}>{getScreenIndex(CALL_TO_ACTION, formData)}</Avatar>
                    <Card className={classes.card}>
                        <CardContent className={classes.content}>
                            <div className={classes.formContainer}>
                                <RichTextInput
                                    source={`${source}call_to_action`}
                                    label="Text"
                                    isRequired
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <FrontPreview className={classes.preview}>
                        <Act
                            callToAction={formData.call_to_action}
                            action={<Link to={"#"} label="Voir le message" onClick={noop} />}
                        />
                    </FrontPreview>
                </Fragment>
            }
        </FormDataConsumer>
    </div>
);

CallToActionInput.propTypes = {
    classes: PropTypes.object,
    source: PropTypes.string,
};

CallToActionInput.defaultProps = {
    source: "",
};

export default addField(withStyles(styles)(CallToActionInput));
