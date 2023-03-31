import React, { useEffect, useState } from 'react';

import { TextInput } from 'react-admin';

type ParagraphTemplateInputProps = {
    source?: string;
    headerCount: number;
    limit: number;
    dataMessageTemplate: {
        value: string;
    }[];
};

export const ParagraphTemplateInput = ({
    source,
    headerCount,
    limit,
    dataMessageTemplate,
}: ParagraphTemplateInputProps) => {
    const [mailToLength, setMailToLength] = useState(headerCount);

    useEffect(() => {
        const messageLength = (dataMessageTemplate && dataMessageTemplate[0] && dataMessageTemplate[0].value) ? encodeURIComponent(dataMessageTemplate[0].value).length : 0;
        setMailToLength(messageLength + headerCount);
    }, [headerCount, dataMessageTemplate]);

    const updateMailToLenght = (event: React.ChangeEvent<HTMLInputElement>) => {
        const messageLength = encodeURIComponent(event.target.value).length;
        setMailToLength(messageLength + headerCount);
    };
    return (
        <TextInput
            source={`${source}.value`}
            label={false}
            multiline
            fullWidth
            helperText={`${mailToLength}/${limit} We recommend not to exceed for mailTo function.`}
            onChange={updateMailToLenght}
        />
    );
};
