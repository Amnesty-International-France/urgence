import { ElementType } from 'react';
import { useParams } from 'react-router';

const withRouter = (WrappedComponent: ElementType) => (props: any) => {
    const params = useParams();
    // etc... other react-router-dom v6 hooks

    return (
        <WrappedComponent
            {...props}
            params={params}
            // etc...
        />
    );
};

export default withRouter;
