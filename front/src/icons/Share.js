import React from 'react';

const Share = (props) => (
    <svg
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 42 42"
        width="1em"
        height="1em"
        {...props}
    >
        <defs>
            <path
                id="partager-a"
                d="M24.444 0C21.39 0 18.89 2.5 18.89 5.556c0 .894.227 1.749.608 2.5L9.67 14.618a5.548 5.548 0 0 0-4.114-1.84C2.5 12.778 0 15.278 0 18.333c0 3.055 2.5 5.556 5.556 5.556 1.63 0 3.095-.713 4.114-1.84l9.827 6.545a5.493 5.493 0 0 0-.608 2.517c0 3.055 2.5 5.556 5.555 5.556 3.056 0 5.556-2.5 5.556-5.556 0-3.055-2.5-5.555-5.556-5.555-1.336 0-2.563.49-3.524 1.284l-10.104-6.718a5.522 5.522 0 0 0 .295-1.789c0-.63-.1-1.222-.295-1.788l10.07-6.736a5.507 5.507 0 0 0 3.558 1.302c3.056 0 5.556-2.5 5.556-5.555C30 2.5 27.5 0 24.444 0z"
            />
        </defs>
        <g transform="translate(6 3)">
            <mask id="partager-b">
                <use xlinkHref="#partager-a" />
            </mask>
            <use xlinkHref="#partager-a" />
            <g mask="url(#partager-b)">
                <path d="M-6-3h42v42H-6z" />
            </g>
        </g>
    </svg>
);

export default Share;
