import React from 'react';

import { black, yellow } from '../themes/colors';
import amnestyLogoMask from './amnestyLogoMask';

type Props = React.SVGProps<SVGSVGElement> & {
    /** Couleur du fond du logo. */
    fill0?: string;
    /** Couleur du tracé (typographie + bougie). */
    fill1?: string;
};

const AmnestyLogo = ({ fill0 = yellow, fill1 = black, ...props }: Props) => {
    // Un id par instance : plusieurs logos peuvent cohabiter sur la même page.
    // useId contient des `:`, retirés car l'id est réinjecté dans un url(#...).
    const maskId = `amnesty-logo-mask-${React.useId().replace(/:/g, '')}`;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7.86111in"
            height="3.125in"
            version="1.1"
            viewBox="0 0 7861 3125"
            {...props}
        >
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="7861" height="3125">
                <image
                    href={amnestyLogoMask}
                    x="0"
                    y="0"
                    width="7861"
                    height="3125"
                    preserveAspectRatio="xMidYMid meet"
                />
            </mask>
            <rect x="0" y="0" width="7861" height="3125" fill={fill0} />
            <rect x="0" y="0" width="7861" height="3125" fill={fill1} mask={`url(#${maskId})`} />
        </svg>
    );
};

export default AmnestyLogo;
