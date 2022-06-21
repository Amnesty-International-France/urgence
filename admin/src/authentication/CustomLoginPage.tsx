import { Login } from 'react-admin';

const CustomLoginPage = () => {
    const { innerWidth, innerHeight } = window;
    return (
        <Login
            backgroundImage={`https://images.unsplash.com/photo-1625089152282-e9d62696341a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyNjY5Njg4OQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=${innerWidth}&h=${innerHeight}`}
        />
    );
};

export default CustomLoginPage;
