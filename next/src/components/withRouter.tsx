import { ElementType } from 'react';
// import { useNavigate, useParams } from 'react-router';

const withRouter = (WrappedComponent: ElementType) => (props: any) => {
    // const params = useParams();
    // const navigate = useNavigate();
    // @next-bc
    const params = {}; 
    const navigate = () => true;

    return <WrappedComponent {...props} params={params} navigate={navigate} />;
};

export default withRouter;
