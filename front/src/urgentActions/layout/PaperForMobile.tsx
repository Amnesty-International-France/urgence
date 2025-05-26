import MobileDetect from 'mobile-detect';
import React, { Fragment } from 'react';
import Paper from '@mui/material/Paper';

type PaperForMobileProps = {
    className?: string;
    elevation: number;
    children: React.ReactNode;
};

const PaperForMobile = ({ className, elevation, children }: PaperForMobileProps) => {
    const isOnMobile = () => {
        const md = new MobileDetect(global.navigator.userAgent);
        return md.mobile();
    };

    return (
        <Fragment>
            {isOnMobile() ? (
                <Paper className={className} elevation={elevation} square>
                    {children}
                </Paper>
            ) : (
                <>{children}</>
            )}
        </Fragment>
    );
};

export default PaperForMobile;
