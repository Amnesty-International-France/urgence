import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import { TextInput, LongTextInput, required } from 'react-admin';
import { CardContent, Card, CardHeader } from 'material-ui';

const styles = {
    root: {
        margin: '1rem 1rem 2rem',
        maxWidth: 500,
    },
    content: {
        marginTop: -24,
    },
};

const validateTitle = required();

export const ThankInput = ({ avatar, classes, label, record, source }) => (
    <Card className={classes.root}>
        <CardHeader
            title={<h3>{label}</h3>}
            avatar={avatar}
            style={{
                title: {
                    fontSize: '1.25rem',
                },
            }}
        />
        <CardContent className={classes.content}>
            <TextInput label="Title" source={`${source}.title`} validate={validateTitle} />
            <LongTextInput multiline label="Text" source={`${source}.text`} />
        </CardContent>
    </Card>
);

ThankInput.propTypes = {
    classes: PropTypes.object,
};

export default injectSheet(styles)(ThankInput);
