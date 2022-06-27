import React, { Fragment } from 'react';

// @ts-expect-error TS(6142): Module '../../themes/Input' was resolved to '/home... Remove this comment to see the full error message
import Input from '../../themes/Input';
// @ts-expect-error TS(6142): Module '../../themes/RichText' was resolved to '/h... Remove this comment to see the full error message
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
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Fragment>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <RichText className="object-indication" html={objectIndication} />
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
