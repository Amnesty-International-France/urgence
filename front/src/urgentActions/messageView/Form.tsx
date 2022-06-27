import React, { Fragment } from 'react';

import Input from '../../themes/Input';
import RichText from '../../themes/RichText';

type Props = {
    analyticsCategory?: string;
    step?: string;
    objectIndication?: string;
    objectExample?: string;
    object?: string;
    setObject: (...args: any[]) => any;
};

const Form = ({
    objectIndication,
    objectExample,
    object,
    analyticsCategory,
    step,
    setObject,
}: Props) => {
    const handleChangeObject = (event: any) => {
        setObject(event.target.value);
    };

    return (
        <Fragment>
            <RichText className="object-indication" html={objectIndication} />
            <Input
                className="object"
                value={object}
                onChange={handleChangeObject}
                error={!object}
                analyticsCategory={analyticsCategory}
                step={step}
                placeholder={objectExample}
            />
        </Fragment>
    );
};

export default Form;
