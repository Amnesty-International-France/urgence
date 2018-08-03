import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { addField, FormDataConsumer } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import { root, preview } from './styles';
import FrontPreview, { noop } from './FrontPreview';
import { get as getScreenIndex, MAIL} from './screenIndex';

import EmailStep from '../../../front/src/urgentActions/EmailStep';
import Link from '../../../front/src/themes/Link';

const styles = {
    ...root,
    preview: {
        ...preview,
        marginLeft: 500,
        // the rules below override desktop media queries so that the preview is forced to appear like on mobile
        '& > div': {
            height: preview.height,
            boxSizing: 'border-box',
            '& a': {
                display: 'block',
            },
            '& input': {
                boxSizing: 'border-box',
            }
        }
    }
};

export const EmailInput = ({ classes }) => (
    <div className={classes.root}>
        <FormDataConsumer>
            {({ formData }) =>
                <Fragment>
                    <Avatar className={classes.avatar}>{getScreenIndex(MAIL, formData)}</Avatar>
                    <FrontPreview className={classes.preview}>
                        <EmailStep
                            setEmail={noop}
                            email=""
                            action={(disabled) => <Link to={"#"} label="Valider" disabled={disabled} />}
                        />
                    </FrontPreview>
                </Fragment>
            }
        </FormDataConsumer>
    </div>
);

EmailInput.propTypes = {
    classes: PropTypes.object,
};

export default addField(withStyles(styles)(EmailInput));
