import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
    addField,
    required,
    minLength,
    maxLength,
    FormDataConsumer,
    LongTextInput,
    TextInput,
} from 'react-admin';
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

export const ThanksInput = ({ classes, source, withLink, final }) => {
    const defaultValues = final
        ? {
              title: 'Merci pour votre action.',
              text:
                  "La lettre vous a été envoyée sur votre boîte e-mail. Poursuivez votre action en l'envoyant par La Poste.",
          }
        : {
              title: 'Se battre. Encore. Et Encore.',
              text:
                  "Continuons d'agir pour augmenter les chances de victoire ! Allez plus loin dans ce combat en envoyant ce message par courrier.",
              button: "Je continue d'agir",
          };

    return (
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
                                    <LongTextInput
                                        source={`${source}.title`}
                                        label="Title"
                                        defaultValue={defaultValues.title}
                                        validate={required()}
                                    />
                                    <RichTextInput
                                        source={`${source}.text`}
                                        label="Text"
                                        defaultValue={defaultValues.text}
                                        validate={required()}
                                    />
                                    {!final && (
                                        <Fragment>
                                            <TextInput
                                                source={`${source}.button`}
                                                label="Button"
                                                defaultValue={defaultValues.button}
                                                validate={(required(), minLength(3), maxLength(25))}
                                            />
                                            {withLink && <LinkInput source={`${source}.link`} />}
                                        </Fragment>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                        <FrontPreview className={classes.preview}>
                            <Thanks
                                data={formData[source]}
                                actions={() =>
                                    !final && formData[source] && formData[source].button ? (
                                        <Link
                                            to="#"
                                            label={formData[source].button}
                                            onClick={noop}
                                        />
                                    ) : null
                                }
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
