import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { addField, LongTextInput } from 'react-admin';

export const ParagraphTemplateInput = ({ source, headerCount, limit, dataMessageTemplate }) => {
    const [mailToLength, setMailToLength] = React.useState(0);

    useEffect(() => {
        if (!dataMessageTemplate || !dataMessageTemplate[0] || !dataMessageTemplate[0].value) {
            return;
        }
        const messageLength = dataMessageTemplate[0].value.length;
        setMailToLength(messageLength + headerCount);
    }, [headerCount, dataMessageTemplate]);

    const updateMailToLenght = event => {
        const messageLength = event.target.value.length;
        setMailToLength(messageLength + headerCount);
    };
    return (
        <LongTextInput
            source={`${source}value`}
            label=""
            helperText={`${mailToLength}/${limit} We recommend not to exceed for mailTo function.`}
            onChange={updateMailToLenght}
        />
    );
};

ParagraphTemplateInput.propTypes = {
    source: PropTypes.string.isRequired,
    headerCount: PropTypes.number,
    limit: PropTypes.number,
    dataMessageTemplate: PropTypes.object,
};

export default addField(ParagraphTemplateInput);
