import { useEffect } from 'react';
import { useRouter } from 'next/router'

const ScrollToTop = (props: any) => {
    const router = useRouter();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [router.pathname]);

    return <>{props.children}</>;
};

export default ScrollToTop;
