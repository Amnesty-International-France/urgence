import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { addField, FormDataConsumer } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import { root, preview } from './styles';
import FrontPreview, { noop } from './FrontPreview';

import { SignatureStep } from '../../../front/src/urgentActions/SignatureStep';
import Link from '../../../front/src/themes/Link';
import { get as getScreenIndex, FULLNAME} from './screenIndex';

const styles = {
    ...root,
    preview: {
        ...preview,
        marginLeft: 500,
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
            }
        }
    }
};

export const FullNameInput = ({ classes }) => (
    <div className={classes.root}>
        <FormDataConsumer>
            {({ formData }) =>
                <Fragment>
                    <Avatar className={classes.avatar}>{getScreenIndex(FULLNAME, formData)}</Avatar>
                    <FrontPreview className={classes.preview}>
                        <SignatureStep
                            setSignature={noop}
                            signature=""
                            action={<Link to={"#"} label="Envoyer" />}
                        />
                    </FrontPreview>
                </Fragment>
            }
        </FormDataConsumer>
    </div>
);

FullNameInput.propTypes = {
    classes: PropTypes.object,
};

export default addField(withStyles(styles)(FullNameInput));
