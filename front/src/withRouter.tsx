import { ElementType } from 'react';
import { useParams } from 'react-router';

const withRouter = (WrappedComponent: ElementType) => (props: any) => {
    const params = useParams();

    return <WrappedComponent {...props} params={params} />;
};

export default withRouter;
