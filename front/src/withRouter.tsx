import { ElementType } from 'react';
import { useNavigate, useParams } from 'react-router';

const withRouter = (WrappedComponent: ElementType) => (props: any) => {
    const params = useParams();
    const navigate = useNavigate();

    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <WrappedComponent {...props} params={params} navigate={navigate} />;
};

export default withRouter;
