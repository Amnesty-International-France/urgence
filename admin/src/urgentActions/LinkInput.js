import React from 'react';
import PropTypes from 'prop-types';

import { addField, Labeled, TextInput } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import LinkIcon from '@material-ui/icons/Link';

import { root } from './styles';

const styles = {
    ...root,
    linkIcon: {
        position: 'relative',
        top: 8,
        marginRight: '1rem',
        fontSize: '2rem',
    },
    formContainer: {
        fontSize: '1rem',
    },
};

export const LinkInput = ({ classes, label, source }) => (
    <Labeled
        label={
            label || (
                <div>
                    <LinkIcon className={classes.linkIcon} />
                    Lien
                </div>
            )
        }
    >
        <div className={classes.root}>
            <div className={classes.formContainer}>
                <TextInput
                    source={`${source}.label`}
                    label="Texte"
                    defaultValue="Je ne souhaite pas poursuivre"
                    fullWidth
                />
                <TextInput source={`${source}.url`} label="Adresse" fullWidth />
            </div>
        </div>
    </Labeled>
);

LinkInput.propTypes = {
    source: PropTypes.string,
    classes: PropTypes.object,
    label: PropTypes.element,
};

LinkInput.defaultProps = {
    source: '',
    label: null,
};

export default addField(withStyles(styles)(LinkInput));
