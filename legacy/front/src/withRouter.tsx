import { ElementType } from 'react';
import { useNavigate, useParams } from 'react-router';

const withRouter = (WrappedComponent: ElementType) => (props: any) => {
    const params = useParams();
    const navigate = useNavigate();

    return <WrappedComponent {...props} params={params} navigate={navigate} />;
};

export default withRouter;
