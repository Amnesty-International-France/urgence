import { useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollToTop = (props: any) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <>{props.children}</>;
};

export default ScrollToTop;
