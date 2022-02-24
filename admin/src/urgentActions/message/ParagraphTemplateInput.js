import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

import { addField, LongTextInput } from 'react-admin';

export const ParagraphTemplateInput = ({ source, count, limit }) => {
    const [helperText, setHelperText] = React.useState('');
    const [error, setError] = React.useState(false);

    useEffect(() => {
        if (count > limit) {
            setHelperText(
                `${count}/${limit}: You have reached the recommanded limit for mailTo function.`,
            );
            setError(true);
        } else {
            setHelperText(`${count}/${limit}`);
            setError(false);
        }
    }, [count, limit]);
    return (
        <Fragment>
            <LongTextInput
                source={`${source}value`}
                error={error}
                label=""
                helperText={helperText}
            />
        </Fragment>
    );
};

ParagraphTemplateInput.propTypes = {
    source: PropTypes.string.isRequired,
    cout: PropTypes.number,
    limit: PropTypes.number,
};

export default addField(ParagraphTemplateInput);
