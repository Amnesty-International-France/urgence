import React from 'react';

const Email = (props: any) => (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <svg
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 42 42"
        width="1em"
        height="1em"
        {...props}
    >
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <defs>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <path
                id="mail-a"
                d="M36.67 22.46l-11.236-9.155L36.67 3.967v18.494zm-32.333.602l11.092-9.04 4.213 3.502a.558.558 0 0 0 .716 0l4.213-3.501 11.093 9.04H4.337zM3.33 3.967l11.235 9.339L3.331 22.46V3.967zm32.356-.615L20 16.39 4.313 3.352h31.374zM39.445 0H.555A.551.551 0 0 0 0 .548v25.268c0 .303.249.548.555.548H39.445a.551.551 0 0 0 .555-.548V.548A.551.551 0 0 0 39.445 0z"
            />
        </defs>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <g transform="translate(1 8)">
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <mask id="mail-b">
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <use xlinkHref="#mail-a" />
            </mask>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <use xlinkHref="#mail-a" />
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <g mask="url(#mail-b)">
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <path d="M-1-8h42v42H-1z" />
            </g>
        </g>
    </svg>
);

export default Email;
