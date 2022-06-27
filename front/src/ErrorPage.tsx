import React, { Fragment } from 'react';
import styled from '@emotion/styled';

// @ts-expect-error TS(6142): Module './SEO' was resolved to '/home/guillaume/de... Remove this comment to see the full error message
import SEO from './SEO';
import generateUrl from './services/generateUrl';
// @ts-expect-error TS(6142): Module './themes/ThemeContext' was resolved to '/h... Remove this comment to see the full error message
import { withYellowLogo } from './themes/ThemeContext';
import { white, yellow, black } from './themes/colors';
// @ts-expect-error TS(6142): Module './themes/Link' was resolved to '/home/guil... Remove this comment to see the full error message
import Link from './themes/Link';
// @ts-expect-error TS(6142): Module './icons/AmnestyCandle' was resolved to '/h... Remove this comment to see the full error message
import AmnestyCandle from './icons/AmnestyCandle';

const styles = {
    fontSize: 33,
    textAlign: 'center',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#000',
    width: '100vw',
    height: '100vh',
    '& .error': {
        color: white,
        margin: 30,
    },
    '& .candle': {
        fill: white,
        fontSize: 133,
    },
    '& .actions': {
        fontFamily: 'Amnesty Trade Gothic Condensed',
        fontWeight: 'bold',
        fontSize: '26px',
        margin: '1.5rem 0',
        '& a': {
            display: 'inline-block',
            color: yellow,
            backgroundColor: black,
            height: 40,
        },
        '& a:hover': {
            color: black,
            backgroundColor: yellow,
        },
    },
};

type OwnProps = {
    className: string;
    title: string;
    description: string;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof ErrorPage.defaultProps;

// @ts-expect-error TS(7022): 'ErrorPage' implicitly has type 'any' because it d... Remove this comment to see the full error message
const ErrorPage = ({ className, title, description }: Props) => (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Fragment>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <SEO socialMetadata={{ title, description }} />
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className={className}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <AmnestyCandle className="candle" />
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <p className="error">{description}</p>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="actions">
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Link to={generateUrl('home')} label="Participer à notre dernière action urgente" />
            </div>
        </div>
    </Fragment>
);

ErrorPage.defaultProps = {
    title: `Une erreur s'est produite 🙊`,
    description: `Oups. Tout ne s'est pas passé comme prévu 🙈.`,
};

// @ts-expect-error TS(2769): No overload matches this call.
export default styled(withYellowLogo(ErrorPage))(styles);
