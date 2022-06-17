import { Login } from 'react-admin';

const CustomLoginPage = () => (
    <Login
        backgroundImage="https://source.unsplash.com/random/1600x900/daily"
        sx={{
            button: {
                background: '#F15922',
            },
        }}
    />
);

export default CustomLoginPage;
